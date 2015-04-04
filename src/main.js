import modalElements from './elements/modal';

var client = new Dropbox.Client({key: "0vbn09clhc23rc5"});
const gifmessPath = '/Public/gifmess/';

var cachedEntries;
function readdir(callback) {
  client.readdir(gifmessPath, (err, files, folder, entries) => {
    cachedEntries = entries.slice()
    cachedEntries.reverse()
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

var modal = modalElements({
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
    form.onsubmit = (ev) => {
      ev.target[0].style.backgroundColor = 'white'
      var query = ev.target[0].value;

      if (!query) {
        removeTiles();
        displayThumbs(0);
        return false;
      }

      var queryRegex;
      try {
        queryRegex = new RegExp(query, 'i')
      } catch (e) {
        queryRegex = null
      }

      var results = [];
      var lowerCaseName;

      for (var i = 0; i < cachedEntries.length; i++) {
        lowerCaseName = cachedEntries[i].name.toLowerCase()

        if (lowerCaseName.indexOf(query) !== -1) {
          results.push(cachedEntries[i]);
        } else if (queryRegex && queryRegex.test(lowerCaseName)) {
          results.push(cachedEntries[i]);
        }
      }

      if (!results.length) {
        ev.target[0].style.backgroundColor = '#AC281C'

        return false;
      }

      removeTiles();

      for (var i = 0; i < results.length; i++) {
        displayThumb(results[i]);
      }

      return false;
    }

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
