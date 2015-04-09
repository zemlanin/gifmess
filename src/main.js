import R from 'ramda'
import Baz from 'bazooka'
import Bacon from 'baconjs'

import getStream from './store'

import modalElement from './elements/modal'
import paneElement from './elements/pane'
import {bazFunc as bazSearch} from './elements/search'

var client = new Dropbox.Client({key: "0vbn09clhc23rc5"});
const gifmessPath = '/Public/gifmess/';

var actionStream = new Bacon.Bus()
var reactionStream = new Bacon.Bus()

var store = getStream('default')
actionStream
  .filter(R.propEq('type', 'searchSubmit'))
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
  .onValue(displayThumbs)
  .onError(R.cond(
    // ev.target[0].style.backgroundColor = '#AC281C'
    [R.eq('Empty results'), console.error.bind(console)]
  ))

function cacheImage(img) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.height = img.height;
  canvas.width = img.width;
  ctx.drawImage(img, 0, 0);
  localStorage.setItem('cachedImg-' + img.dataset.versiontag, canvas.toDataURL('image/png'));
  ctx = canvas = null;
}

actionStream
  .filter(R.propEq('type', 'thumbnailLoaded'))
  .map('.ev.target')
  .onValue(cacheImage);

function thumbnailClicked(img) {
  var lsKey = 'cachedShare-' + img.dataset.versiontag
  var cached = localStorage.getItem(lsKey)

  if (cached) {
    displayModal(cached, img.dataset.original)
  } else {
    client.makeUrl(
      img.dataset.original,
      {downloadHack: true},
      (err, shareUrl) => {
        displayModal(shareUrl.url, img.dataset.original)
        localStorage.setItem(lsKey, shareUrl.url)
      }
    );
  }
}

actionStream
  .filter(R.propEq('type', 'thumbnailClicked'))
  .map('.ev.target')
  .onValue(thumbnailClicked);

store.pull
  .map('.cachedEntries')
  .sampledBy(
    actionStream
      .filter(R.propEq('type', 'displayMore'))
      .map('.offset')
      .map(R.add(50)),
    (entries, offset) => [R.slice(0, offset, entries), entries.length > offset]
  )
  .onValue(displayThumbs);

function updateImg(oldOriginal, fileEntity) {
  var tile = document.querySelector(`img[data-original="${oldOriginal}"]`);
  if (tile) {
    tile.dataset.original = fileEntity.path
    tile.dataset.versiontag = fileEntity.versionTag
  }
}

var modal = modalElement({
  onCloseClick: function() { this.setProps({visible: false}) },
  onInputClick: function(ev) { ev.target.select() },
  onRenameSubmit: function(ev) {
    var newName = ev.target[0].value
    var oldPath = this.props.original

    if (!newName) {
      return false
    }

    client.move(
      oldPath,
      gifmessPath + newName,
      (err, fileEntity) => {
        if (err) {
          this.setProps({original: this.props.original})
          return
        }

        readdir()
          .doAction(updateImg.bind(null, this.props.original, fileEntity))
        this.setProps({original: fileEntity.path, visible: false})
      }
    )

    return false
  },
}, document.body);

function displayModal(shareUrl, original) {
  modal.setProps({
    href: shareUrl,
    original: original,
    visible: true,
    positionTop: window.scrollY + 10,
  })
}

() => {
  // lazy fuck
  var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = `
      .tile {
        width: 64px; height: 64px; background-color: white;
        margin: 3px;
        float: left; text-align: center;
        cursor: pointer;
      }
    `;
  document.head.appendChild(css);

  document.body.style.backgroundColor = '#DFFEE3';
  document.body.style.margin = '0';
}()

var pane = paneElement({client, actionStream}, document.body)

client.authenticate();

function displayThumbs([thumbnails, more]) {
  pane.setProps({
    thumbnails,
    more,
  })
}

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

readdir()
  .map(R.of)
  .map(R.ap([
    R.slice(0, 50), // thumbnails
    R.pipe(         // more
      R.length,
      R.lt(50)
    )
  ]))
  .onValue(displayThumbs)

Baz.register({
  'search': bazSearch.bind(null, reactionStream, actionStream),
})
Baz.refresh()
