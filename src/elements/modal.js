import {h} from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

var modalTree = function modalTree() {
  return h(
    'div', {
      style: {
        'z-index': 10,
        position: 'absolute',
        padding: '5px 10px',
        backgroundColor: 'white',
        // display: 'none',
        maxWidth: '100%',
      },
    }, [
      h('span', {
        style: {
          float: 'left',
          padding: '10px',
          cursor: 'pointer',
          // onclick
        },
      }, 'x'),
      h('input', {
        style: {
          width: '100%',
          float: 'left',
          // onclick
        },
        readOnly: true,
      }),
      h('a', {
        style: {
          float: 'left',
          maxWidth: 'inherit',
        },
        target: '_blank',
        // href
      }, [
        h('img', {
          style: {
            float: 'left',
            maxWidth: 'inherit',
          },
          // src
        }),
      ]),
    ]
  );
}

export default {
  bazFunc: function bazFunc(node) {
    var rootNode = createElement(modalTree());
    node.appendChild(rootNode);
  },
}

