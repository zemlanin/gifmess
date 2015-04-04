import {h} from 'virtual-dom'
import Element from './element'

function modalTree(props) {
  return h(
    'div', {
      style: {
        'z-index': 10,
        position: 'absolute',
        padding: '5px 10px',
        backgroundColor: 'white',
        display: props.visible ? 'block' : 'none',
        maxWidth: '100%',
        top: props.positionTop + 'px',
      },
    }, [
      h('span', {
        style: {
          float: 'left',
          padding: '10px',
          cursor: 'pointer',
          fontFamily: 'monospace',
        },
        onclick: props.onCloseClick.bind(this),
      }, 'X'),
      h(
        'form', {
          action: '#',
          onsubmit: props.onRenameSubmit.bind(this),
        },
        h('input', {
          style: {
            width: '100%',
            float: 'left',
          },
          value: props.original ? props.original.replace(/\/.*\//, '') : '',
        })
      ),
      h('a', {
        style: {
          float: 'left',
          maxWidth: 'inherit',
        },
        target: '_blank',
        href: props.href,
      }, [
        h('img', {
          style: {
            float: 'left',
            maxWidth: 'inherit',
          },
          src: props.href,
        }),
      ]),
      h('input', {
        style: {
          width: '100%',
          float: 'left',
        },
        onclick: props.onInputClick.bind(this),
        readOnly: true,
        value: props.href,
      }),
    ]
  );
}

export default Element(modalTree)
