"use strict";

var client = new Dropbox.Client({ key: "0vbn09clhc23rc5" });

var modal = document.createElement("div");

(function () {
  // lazy fuck
  modal.style["z-index"] = 10;
  modal.style.position = "fixed";
  modal.style.top = "10px";
  modal.style.padding = "5px 10px";
  modal.style.backgroundColor = "white";
  modal.style.display = "none";
  modal.style.width = "240px";

  var close = document.createElement("span");
  close.style.float = "left";
  close.textContent = "x";
  close.style.padding = "10px";
  close.style.cursor = "pointer";
  close.onclick = function () {
    return modal.style.display = "none";
  };
  modal.appendChild(close);

  var a = document.createElement("a");
  a.target = "_blank";
  a.style.float = "left";
  modal.appendChild(a);

  var img = new Image();
  img.style.width = "200px";
  img.style.float = "left";
  a.appendChild(img);

  var input = document.createElement("input");
  input.style.width = "100%";
  input.style.float = "left";
  input.readOnly = true;
  input.onclick = input.select();
  modal.appendChild(input);

  document.body.appendChild(modal);
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

var cachedEntries;

function displayThumbs(offset) {
  var img;
  var cached;

  offset = offset || 0;
  for (var i = offset; i < cachedEntries.length && i < offset + 50; i++) {
    if (!cachedEntries[i].hasThumbnail) {
      continue;
    }
    img = new Image();
    img.onclick = imgOnClick;
    img.dataset.original = cachedEntries[i].path;

    cached = localStorage.getItem("cachedImg-" + cachedEntries[i].versionTag);
    if (cached) {
      img.src = cached;
    } else {
      img.crossOrigin = "anonymous";
      img.src = client.thumbnailUrl(img.dataset.original, { png: true });
      img.onload = cacheImage.bind(null, img, cachedEntries[i].versionTag);
    }

    document.body.appendChild(img);
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
  cachedEntries = entries;

  displayThumbs(0);
});
