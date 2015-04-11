import {h} from 'virtual-dom'
import Element from './element'

function modalTree(props) {
  var {actionStream, visible, positionTop, original, href} = props

  return h('div', {
      style: {
        'z-index': 10,
        position: 'absolute',
        padding: '5px 10px',
        backgroundColor: 'white',
        display: visible ? 'block' : 'none',
        maxWidth: '100%',
        top: positionTop + 'px',
      },
    }, [
      h('span', {
        style: {
          float: 'left',
          padding: '10px',
          cursor: 'pointer',
          fontFamily: 'monospace',
        },
        onclick: actionStream.push.bind(actionStream, {type: 'modalClose'}),
      }, 'X'),
      h('form', {
          action: '#',
          onsubmit: ev => {actionStream.push({type: 'renameSubmit', ev, original}); return false}
        },
        h('input', {
          style: {
            width: '100%',
            float: 'left',
          },
          value: original ? original.replace(/\/.*\//, '') : '',
        })
      ),
      h('a', {
        style: {
          float: 'left',
          maxWidth: 'inherit',
        },
        target: '_blank',
        href: href,
      }, [
        h('img', {
          style: {
            float: 'left',
            maxWidth: 'inherit',
          },
          src: href,
        }),
      ]),
      h('input', {
        style: {
          width: '100%',
          float: 'left',
        },
        readOnly: true,
        value: href,
      }),
    ]
  );
}

export default Element(modalTree)
