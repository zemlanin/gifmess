"use strict";

var client = new Dropbox.Client({ key: "0vbn09clhc23rc5" });

var modal = document.createElement("div");

var cachedEntries;

(function () {
  // lazy fuck
  modal.style["z-index"] = 10;
  modal.style.position = "absolute";
  modal.style.top = "10px";
  modal.style.padding = "5px 10px";
  modal.style.backgroundColor = "white";
  modal.style.display = "none";
  modal.style.maxWidth = "100%";

  var close = document.createElement("span");
  close.style.float = "left";
  close.textContent = "x";
  close.style.padding = "10px";
  close.style.cursor = "pointer";
  close.onclick = function () {
    return modal.style.display = "none";
  };
  modal.appendChild(close);

  var input = document.createElement("input");
  input.style.width = "100%";
  input.style.float = "left";
  input.readOnly = true;
  input.onclick = input.select();
  modal.appendChild(input);

  var a = document.createElement("a");
  a.target = "_blank";
  a.style.float = "left";
  a.style.maxWidth = "inherit";
  var img = new Image();
  img.style.maxWidth = "inherit";
  a.appendChild(img);

  modal.appendChild(a);

  document.body.appendChild(modal);
})();

(function () {
  var form = document.createElement("form");

  form.action = "#";
  form.onsubmit = function (ev) {
    ev.target[0].style.backgroundColor = "white";
    var query = ev.target[0].value;

    if (!query) {
      displayThumbs(0);
      return false;
    }

    var queryRegex;
    try {
      queryRegex = new RegExp(query, "i");
    } catch (e) {
      queryRegex = null;
    }

    var results = [];
    var lowerCaseName;

    for (var i = 0; i < cachedEntries.length; i++) {
      lowerCaseName = cachedEntries[i].name.toLowerCase();

      if (lowerCaseName.indexOf(query) !== -1) {
        results.push(cachedEntries[i]);
      } else if (queryRegex && queryRegex.test(lowerCaseName)) {
        results.push(cachedEntries[i]);
      }
    }

    if (!results.length) {
      ev.target[0].style.backgroundColor = "#AC281C";

      return false;
    }

    Array.prototype.forEach.call(document.body.querySelectorAll("img[data-original]"), document.body.removeChild.bind(document.body));

    for (var i = 0; i < results.length; i++) {
      displayThumb(results[i]);
    }

    return false;
  };

  var search = document.createElement("input");
  form.appendChild(search);
  document.body.appendChild(form);
})();

var gifmessPath = "/Public/gifmess/";

function imgOnClick(ev) {
  client.makeUrl(ev.target.dataset.original, { downloadHack: true }, function (err, shareUrl) {
    var img = modal.getElementsByTagName("img")[0];
    img.src = shareUrl.url;

    var a = modal.getElementsByTagName("a")[0];
    a.href = shareUrl.url;

    var input = modal.getElementsByTagName("input")[0];
    input.value = shareUrl.url;

    modal.style.display = "block";
    input.select();
  });
}

function cacheImage(img, fileVersion) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.height = img.height;
  canvas.width = img.width;
  ctx.drawImage(img, 0, 0);
  localStorage.setItem("cachedImg-" + fileVersion, canvas.toDataURL("image/png"));
  ctx = canvas = null;
}

client.authenticate();

function displayThumb(fileEntity) {
  if (!fileEntity.hasThumbnail) {
    return;
  }
  var img = new Image();
  img.onclick = imgOnClick;
  img.dataset.original = fileEntity.path;

  var cached = localStorage.getItem("cachedImg-" + fileEntity.versionTag);
  if (cached) {
    img.src = cached;
  } else {
    img.crossOrigin = "anonymous";
    img.src = client.thumbnailUrl(img.dataset.original, { png: true });
    img.onload = cacheImage.bind(null, img, fileEntity.versionTag);
  }

  document.body.appendChild(img);
}

function displayThumbs(offset) {
  offset = offset || 0;
  for (var i = offset; i < cachedEntries.length && i < offset + 50; i++) {
    displayThumb(cachedEntries[i]);
  }

  if (offset + 50 < cachedEntries.length) {
    displayMoreButton(offset + 50);
  }
}

function displayMoreButton(offset) {
  var close = document.createElement("span");
  close.textContent = "+";
  close.style.padding = "10px";
  close.style.margin = "10px";
  close.style.cursor = "pointer";
  close.onclick = displayThumbs.bind(null, offset);
  document.body.appendChild(close);
}

client.readdir(gifmessPath, function (err, files, folder, entries) {
  cachedEntries = entries.slice();
  cachedEntries.reverse();

  displayThumbs(0);
});
