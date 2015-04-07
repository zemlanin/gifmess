import {h} from 'virtual-dom'

export function bazFunc(inStream, outStream, node) {
  var form = document.createElement('form');

    form.action = '#';
    form.onsubmit = ev => {outStream.push({type: 'searchSubmit', ev}); return false}

  var search = document.createElement('input');
    search.style.width = '60%';
    search.style.margin = '10px auto';
    search.style.display = 'block';
    form.appendChild(search);
  node.appendChild(form);
}
