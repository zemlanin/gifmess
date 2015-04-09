import R from 'ramda'
import {h} from 'virtual-dom'

import Element from './element'

function streamPush(actionStream, type, ev) { actionStream.push({type, ev}) }

function thumbTree(props) {
  if (!props.hasThumbnail) {
    return h()
  }

  var cached = localStorage.getItem('cachedImg-' + props.versionTag)
  var src
  var onload
  var crossOrigin

  if (cached) {
    src = cached
  } else {
    crossOrigin = "anonymous"
    src = props.client.thumbnailUrl(props.path, {png: true})
    onload = streamPush.bind(null, props.actionStream, 'thumbnailLoaded')
  }

  return h('div', {
      className: 'tile',
      onclick: streamPush.bind(null, props.actionStream, 'thumbnailClicked'),
    },
    h('img', {
        onload,
        crossOrigin,
        dataset: {
          original: props.path,
          versiontag: props.versionTag,
        },
        src,
      }
    )
  )
}

function moreButtonTree(props) {
  var {actionStream, offset} = props

  return h('div', {
      className: 'tile',
      onclick: ev => { actionStream.push({type: 'displayMore', ev, offset}) },
    },
    h('span', {style: {padding: '10px'}}, '+')
  )
}

function paneTree(props) {
  var {thumbnails, client, actionStream, more} = props

  if (!thumbnails) { return h('div') }

  var offset = thumbnails.length

  return h('div',
    {},
    [
      thumbnails.map(R.pipe(
        R.merge({client, actionStream}),
        thumbTree
      )),
      props.more ? moreButtonTree({actionStream, offset}) : ''
    ]
  )
}

export default Element(paneTree)
