import R from 'ramda'
import Bacon from 'baconjs'

import getStream from './store'

import modalElement from './elements/modal'
import paneElement from './elements/pane'

var store = getStream('default')
var onSearchStream = new Bacon.Bus()
onSearchStream
  .map('.target.0')
  .name('searchField')
  .doAction(field => { field.style.backgroundColor = 'white' })
  .flatMap(field => field.value || new Bacon.Error('Empty query'))
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
          queryRegex.test.bind(queryRegex)
        ])
      ),
      entries
    )
  })
  .flatMap(results => {
    if (results instanceof Bacon.Error) { return results }
    if (!results.length) { return new Bacon.Error('Empty results') }
    return results
  })
  .doAction(removeTiles)
  .onValue(R.map(displayThumb))
  .onError(err => {
    switch (err) {
      case 'Empty query':
        removeTiles()
        displayThumbs(0)
        break;
      case 'Empty results':
        console.error(err)
        // ev.target[0].style.backgroundColor = '#AC281C'
        break;
    }
  })

var client = new Dropbox.Client({key: "0vbn09clhc23rc5"});
const gifmessPath = '/Public/gifmess/';

var cachedEntries;

function readdir(callback) {
  client.readdir(gifmessPath, (err, files, folder, entries) => {
    cachedEntries = entries.slice()
    cachedEntries = R.reverse(R.sortBy(
      R.prop('clientModifiedAt'), entries.slice()
    ))
    store.push({cachedEntries: R.clone(cachedEntries)})
    if (callback) { callback() }
  })
}

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

        readdir(updateImg.bind(null, this.props.original, fileEntity))
        this.setProps({original: fileEntity.path, visible: false})
      }
    )

    return false
  },
}, document.body);

() => {
  // lazy fuck
  var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = `
      .tile {
        width: 64px; height: 64px; background-color: white;
        margin: 3px;
        float: left; text-align: center;
      }
    `;
  document.head.appendChild(css);

  document.body.style.backgroundColor = '#DFFEE3';
  document.body.style.margin = '0';
}();

function removeTiles() {
  Array.prototype.forEach.call(
    document.body.querySelectorAll('.tile'),
    document.body.removeChild.bind(document.body)
  );
}

function removeMore() {
  if (document.body.querySelector('.tile.more')) {
    document.body.removeChild(document.body.querySelector('.tile.more'))
  }
}

() => {
  var form = document.createElement('form');

    form.action = '#';
    form.onsubmit = ev => {onSearchStream.push(ev); return false}

  var search = document.createElement('input');
    search.style.width = '60%';
    search.style.margin = '10px auto';
    search.style.display = 'block';
    form.appendChild(search);
  document.body.appendChild(form);
}();

function displayModal(shareUrl, original) {
  modal.setProps({
    href: shareUrl,
    original: original,
    visible: true,
    positionTop: window.scrollY + 10,
  })
}

function imgOnClick(img) {
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

function cacheImage(img) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.height = img.height;
  canvas.width = img.width;
  ctx.drawImage(img, 0, 0);
  localStorage.setItem('cachedImg-' + img.dataset.versiontag, canvas.toDataURL('image/png'));
  ctx = canvas = null;
}

client.authenticate();

function displayThumb(fileEntity) {
  if (!fileEntity.hasThumbnail) {
    return;
  }
  var div = document.createElement('div');
  div.className = 'tile';

  var img = new Image();
  img.dataset.original = fileEntity.path;
  img.dataset.versiontag = fileEntity.versionTag;

  div.onclick = imgOnClick.bind(null, img);

  var cached = localStorage.getItem('cachedImg-' + fileEntity.versionTag);
  if (cached) {
    img.src = cached;
  } else {
    img.crossOrigin = "anonymous";
    img.src = client.thumbnailUrl(img.dataset.original, {png: true});
    img.onload = cacheImage.bind(null, img);
  }

  div.appendChild(img);
  document.body.appendChild(div);
}

function displayThumbs(offset) {
  offset = offset || 0;
  for (var i = offset; i < cachedEntries.length && i < offset + 50; i++) {
    displayThumb(cachedEntries[i]);
  }

  removeMore();

  if (offset + 50 < cachedEntries.length) {
    displayMoreButton(offset + 50);
  }
}

function displayMoreButton(offset) {
  var div = document.createElement('div');
    div.className = 'tile more';

    var close = document.createElement('span');
      close.textContent = '+';
      close.style.padding = '10px';
      close.style.margin = '10px';
      close.style.cursor = 'pointer';
      close.onclick = displayThumbs.bind(null, offset);
    div.appendChild(close);

  document.body.appendChild(div);
}

readdir(displayThumbs.bind(null, 0));
