import Bacon from 'baconjs'
import merge from 'lodash.merge'

function StoreStream(name) {
  var pushStream = new Bacon.Bus();

  var store = pushStream.scan({}, merge);

  this.name = name;
  this.pull = store;
  this.push = pushStream.push.bind(pushStream);
}

var streamsMap = {};

function getStream(name) {
  streamsMap[name] = streamsMap[name] || new StoreStream(name);

  return streamsMap[name];
}

export default getStream
