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
        },
        onclick: props.onCloseClick.bind(this),
      }, 'x'),
      h('input', {
        style: {
          width: '100%',
          float: 'left',
        },
        onclick: props.onInputClick.bind(this),
        readOnly: true,
        value: props.href,
      }),
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
    ]
  );
}

export default Element(modalTree)
