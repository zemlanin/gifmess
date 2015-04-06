import {h} from 'virtual-dom'
import Element from './element'

function tileTree(props) {
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
    // onload = cacheImage.bind(null, img)
  }

  return h('div', {
      className: 'tile',
      // onclick = imgOnClick.bind(null, img);
    },
    h('img', {
        'data-original': props.path,
        'data-versiontag': props.versionTag,
        'src': src,
        'cross-origin': crossOrigin,
        'onload': onload,
      }
    )
  )
}

function paneTree(props) {
  return h('div',
    {},
    props.thumbnails.map(tileTree)
  )
}

export default Element(paneTree)
