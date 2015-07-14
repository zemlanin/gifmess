import R from 'ramda'
import Baz from 'bazooka'
import Bacon from 'baconjs'

import getStream from './store'

import modalElement from './elements/modal'
import paneElement from './elements/pane'
import {bazFunc as bazSearch} from './elements/search'

var client = new Dropbox.Client({key: "0vbn09clhc23rc5"})
const gifmessPath = '/Public/gifmess/'

var actionStream = new Bacon.Bus()
var reactionStream = new Bacon.Bus()

var modal = modalElement({actionStream}, document.body)
var pane = paneElement({client, actionStream}, document.body)

var store = getStream('default')
actionStream.filter(R.propEq('type', 'searchSubmit'))
  .map('.ev.target.0')
  .name('searchField')
  .doAction(field => { field.style.backgroundColor = 'white' })
  .map('.value')
  .flatMap(R.flip(R.or)(new Bacon.Error('Empty query')))
  .map('.toLowerCase')
  .name('query')
  .map(query => {
    try {
      return [query, new RegExp(query, 'i')]
    } catch (e) {
      return [query, null]
    }
  })
  .combine(store.pull.map('.cachedEntries'), ([query, queryRegex], entries) => {
    return R.filter(
      R.pipe(
        R.prop('name'),
        R.toLower,
        R.anyPass([
          R.contains(query),
          queryRegex ? queryRegex.test.bind(queryRegex) : R.F
        ])
      ),
      entries
    )
  })
  .flatMap(R.cond(
    [R.is(Bacon.Error), R.identity],
    [R.length, R.identity],
    [R.T, R.always(new Bacon.Error('Empty results'))]
  ))
  .map(R.of)
  .flatMapError(err => {
    if (err === 'Empty query') {
      return store.pull
        .map('.cachedEntries')
        .map(R.of)
        .map(R.ap([
          R.slice(0, 50), // thumbnails
          R.pipe(         // more
            R.length,
            R.lt(50)
          )
        ]))
    }
    return new Bacon.Error(err)
  })
  .map(R.zipObj(['thumbnails', 'more']))
  .onValue(pane.setProps.bind(pane))
  .onError(R.cond(
    // ev.target[0].style.backgroundColor = '#AC281C'
    [R.eq('Empty results'), console.error.bind(console)]
  ))

function readdir() {
  return Bacon.fromCallback(callback => {
    client.readdir(
      gifmessPath,
      (err, files, folder, entries) => callback({err, files, folder, entries})
    )
  })
  .map('.entries')
  .map(R.sortBy(R.prop('clientModifiedAt')))
  .map(R.reverse)
  .doAction(
    R.pipe(
      R.createMapEntry('cachedEntries'),
      store.push
    )
  )
}

actionStream.filter(R.propEq('type', 'thumbnailLoaded'))
  .map('.ev.target')
  .onValue(img => {
    var canvas = document.createElement('canvas')
    canvas.height = img.height
    canvas.width = img.width
    canvas.getContext('2d').drawImage(img, 0, 0)
    localStorage.setItem('cachedImg-' + img.dataset.versiontag, canvas.toDataURL('image/png'))
    canvas = null
  })

function thumbnailClicked({versiontag, original}) {
  var cached = localStorage.getItem('cachedShare-' + versiontag)

  if (cached) { return {href: cached, original} }

  return Bacon.fromCallback(callback => client.makeUrl(
    original,
    {downloadHack: true},
    (err, {url}) => {
      localStorage.setItem('cachedShare-' + versiontag, url)
      callback({href: url, original})
    }
  ))
}

actionStream.filter(R.propEq('type', 'thumbnailClicked'))
  .map('.ev.target.dataset')
  .flatMap(thumbnailClicked)
  .map(R.merge({visible: true}))
  .map(R.converge(
    R.merge,
    () => ({positionTop: window.scrollY + 10}),
    R.identity
  ))
  .onValue(modal.setProps.bind(modal))

store.pull.map('.cachedEntries')
  .sampledBy(
    Bacon.mergeAll(
      actionStream.filter(R.propEq('type', 'displayMore'))
        .map('.offset')
        .map(R.add(50)),
      actionStream.filter(R.propEq('type', 'refreshDisplay'))
        .map(50)
    ),
    (entries, offset) => (
      {thumbnails: R.slice(0, offset, entries), more: entries.length > offset}
    )
  )
  .onValue(pane.setProps.bind(pane))

actionStream.filter(R.propEq('type', 'modalClose'))
  .map({visible: false})
  .onValue(modal.setProps.bind(modal))

actionStream.filter(R.propEq('type', 'renameSubmit'))
  .flatMap(({ev, original: oldPath}) => {
    var newName = ev.target[0].value

    if (!newName) { return Bacon.never() }

    return Bacon.fromCallback(callback => client.move(
      oldPath,
      gifmessPath + newName,
      (err, fileEntity) => callback({oldPath, err, fileEntity})
    ))
  })
  .flatMap(R.cond(
    [R.prop('err'), R.always(new Bacon.Error('Failed rename'))],
    [R.T, R.pick(['oldPath', 'fileEntity'])]
  ))
  .doAction(R.pipe(
    R.prop('fileEntity'),
    R.prop('path'),
    R.createMapEntry('original'),
    R.merge({visible: false}),
    modal.setProps.bind(modal)
  ))
  .flatMap(readdir)
  .map({type: 'refreshDisplay'})
  .doAction(actionStream.push.bind(actionStream))
  .onError(R.pipe(
    R.prop('oldPath'),
    R.createMapEntry('original'),
    modal.setProps.bind(modal)
  ))

client.authenticate()

actionStream
  .plug(
    readdir().map({type: 'refreshDisplay'})
  )

Baz.register({
  'search': bazSearch.bind(null, reactionStream, actionStream),
})
Baz.refresh()
