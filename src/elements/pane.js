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

function moreButtonTree() {
  return h('div', {
      className: 'tile',
      // TODO
      // onclick = displayThumbs.bind(null, offset);
    },
    h('span', {style: {padding: '10px'}}, '+')
  )
}

function paneTree(props) {
  if (!props || !props.thumbnails) { return h('div') }

  return h('div',
    {},
    [
      props.thumbnails.map(R.pipe(
        R.merge(R.pick(['actionStream', 'client'], props)),
        thumbTree
      )),
      props.more ? moreButtonTree() : ''
    ]
  )
}

export default Element(paneTree)
