(function e(t,n,r){function o(a,s){if(!n[a]){if(!t[a]){var u=typeof require=="function"&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var f=new Error("Cannot find module '"+a+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[a]={exports:{}};t[a][0].call(l.exports,function(e){var n=t[a][1][e];return o(n?n:e)},l,l.exports,e,t,n,r)}return n[a].exports}var i=typeof require=="function"&&require;for(var a=0;a<r.length;a++)o(r[a]);return o})({1:[function(e,t,n){},{}],2:[function(e,t,n){var r=e("lodash._arraycopy"),o=e("lodash._arrayeach"),i=e("lodash._basefor"),a=e("lodash._createassigner"),s=e("lodash.isarguments"),u=e("lodash.isarray"),f=e("lodash.isnative"),l=e("lodash.isplainobject"),c=e("lodash.istypedarray"),v=e("lodash.keys"),d=e("lodash.keysin"),p=e("lodash.toplainobject");function h(e){return!!e&&typeof e=="object"}var y=Math.pow(2,53)-1;function g(e,t){return i(e,t,v)}function m(e,t,n,r,i){if(!k(e)){return e}var a=x(t.length)&&(u(t)||c(t));(a?o:g)(t,function(t,o,s){if(h(t)){r||(r=[]);i||(i=[]);return b(e,s,o,m,n,r,i)}var u=e[o],f=n?n(u,t,o,e,s):undefined,l=typeof f=="undefined";if(l){f=t}if((a||typeof f!="undefined")&&(l||(f===f?f!==u:u===u))){e[o]=f}});return e}function b(e,t,n,o,i,a,f){var v=a.length,d=t[n];while(v--){if(a[v]==d){e[n]=f[v];return}}var h=e[n],y=i?i(h,d,n,e,t):undefined,g=typeof y=="undefined";if(g){y=d;if(x(d.length)&&(u(d)||c(d))){y=u(h)?h:h&&h.length?r(h):[]}else if(l(d)||s(d)){y=s(h)?p(h):l(h)?h:{}}else{g=false}}a.push(d);f.push(y);if(g){e[n]=o(y,d,i,a,f)}else if(y===y?y!==h:h===h){e[n]=y}}function x(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=y}function k(e){var t=typeof e;return t=="function"||!!e&&t=="object"}var j=a(m);t.exports=j},{"lodash._arraycopy":3,"lodash._arrayeach":4,"lodash._basefor":5,"lodash._createassigner":6,"lodash.isarguments":9,"lodash.isarray":10,"lodash.isnative":11,"lodash.isplainobject":12,"lodash.istypedarray":13,"lodash.keys":14,"lodash.keysin":15,"lodash.toplainobject":16}],3:[function(e,t,n){function r(e,t){var n=-1,r=e.length;t||(t=Array(r));while(++n<r){t[n]=e[n]}return t}t.exports=r},{}],4:[function(e,t,n){function r(e,t){var n=-1,r=e.length;while(++n<r){if(t(e[n],n,e)===false){break}}return e}t.exports=r},{}],5:[function(e,t,n){var r=o();function o(e){return function(t,n,r){var o=i(t),a=r(t),s=a.length,u=e?s:-1;while(e?u--:++u<s){var f=a[u];if(n(o[f],f,o)===false){break}}return t}}function i(e){return a(e)?e:Object(e)}function a(e){var t=typeof e;return t=="function"||!!e&&t=="object"}t.exports=r},{}],6:[function(e,t,n){var r=e("lodash._bindcallback"),o=e("lodash._isiterateecall");function i(e){return function(){var t=arguments,n=t.length,i=t[0];if(n<2||i==null){return i}var a=t[n-2],s=t[n-1],u=t[3];if(n>3&&typeof a=="function"){a=r(a,s,5);n-=2}else{a=n>2&&typeof s=="function"?s:null;n-=a?1:0}if(u&&o(t[1],t[2],u)){a=n==3?null:a;n=2}var f=0;while(++f<n){var l=t[f];if(l){e(i,l,a)}}return i}}t.exports=i},{"lodash._bindcallback":7,"lodash._isiterateecall":8}],7:[function(e,t,n){function r(e,t,n){if(typeof e!="function"){return o}if(typeof t=="undefined"){return e}switch(n){case 1:return function(n){return e.call(t,n)};case 3:return function(n,r,o){return e.call(t,n,r,o)};case 4:return function(n,r,o,i){return e.call(t,n,r,o,i)};case 5:return function(n,r,o,i,a){return e.call(t,n,r,o,i,a)}}return function(){return e.apply(t,arguments)}}function o(e){return e}t.exports=r},{}],8:[function(e,t,n){var r=Math.pow(2,53)-1;function o(e,t){e=+e;t=t==null?r:t;return e>-1&&e%1==0&&e<t}function i(e,t,n){if(!s(n)){return false}var r=typeof t;if(r=="number"){var i=n.length,u=a(i)&&o(t,i)}else{u=r=="string"&&t in n}if(u){var f=n[t];return e===e?e===f:f!==f}return false}function a(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=r}function s(e){var t=typeof e;return t=="function"||!!e&&t=="object"}t.exports=i},{}],9:[function(e,t,n){var r="[object Arguments]";function o(e){return!!e&&typeof e=="object"}var i=Object.prototype;var a=i.toString;var s=Math.pow(2,53)-1;function u(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=s}function f(e){var t=o(e)?e.length:undefined;return u(t)&&a.call(e)==r}t.exports=f},{}],10:[function(e,t,n){var r="[object Array]",o="[object Function]";var i=/^\[object .+?Constructor\]$/;var a=/[.*+?^${}()|[\]\/\\]/g,s=RegExp(a.source);function u(e){if(typeof e=="string"){return e}return e==null?"":e+""}function f(e){return!!e&&typeof e=="object"}var l=Object.prototype;var c=Function.prototype.toString;var v=l.toString;var d=RegExp("^"+b(v).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var p=m(p=Array.isArray)&&p;var h=Math.pow(2,53)-1;function y(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=h}var g=p||function(e){return f(e)&&y(e.length)&&v.call(e)==r};function m(e){if(e==null){return false}if(v.call(e)==o){return d.test(c.call(e))}return f(e)&&i.test(e)}function b(e){e=u(e);return e&&s.test(e)?e.replace(a,"\\$&"):e}t.exports=g},{}],11:[function(e,t,n){var r="[object Function]";var o=/^\[object .+?Constructor\]$/;var i=/[.*+?^${}()|[\]\/\\]/g,a=RegExp(i.source);function s(e){if(typeof e=="string"){return e}return e==null?"":e+""}function u(e){return!!e&&typeof e=="object"}var f=Object.prototype;var l=Function.prototype.toString;var c=f.toString;var v=RegExp("^"+p(c).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function d(e){if(e==null){return false}if(c.call(e)==r){return v.test(l.call(e))}return u(e)&&o.test(e)}function p(e){e=s(e);return e&&a.test(e)?e.replace(i,"\\$&"):e}t.exports=d},{}],12:[function(e,t,n){var r=e("lodash._basefor"),o=e("lodash.isnative"),i=e("lodash.keysin");var a="[object Object]";function s(e){return!!e&&typeof e=="object"}var u=Object.prototype;var f=u.hasOwnProperty;var l=u.toString;var c=o(c=Object.getPrototypeOf)&&c;function v(e,t){return r(e,t,i)}function d(e){var t;if(!(s(e)&&l.call(e)==a)||!f.call(e,"constructor")&&(t=e.constructor,typeof t=="function"&&!(t instanceof t))){return false}var n;v(e,function(e,t){n=t});return typeof n=="undefined"||f.call(e,n)}var p=!c?d:function(e){if(!(e&&l.call(e)==a)){return false}var t=e.valueOf,n=o(t)&&(n=c(t))&&c(n);return n?e==n||c(e)==n:d(e)};t.exports=p},{"lodash._basefor":5,"lodash.isnative":11,"lodash.keysin":15}],13:[function(e,t,n){var r="[object Arguments]",o="[object Array]",i="[object Boolean]",a="[object Date]",s="[object Error]",u="[object Function]",f="[object Map]",l="[object Number]",c="[object Object]",v="[object RegExp]",d="[object Set]",p="[object String]",h="[object WeakMap]";var y="[object ArrayBuffer]",g="[object Float32Array]",m="[object Float64Array]",b="[object Int8Array]",x="[object Int16Array]",k="[object Int32Array]",j="[object Uint8Array]",w="[object Uint8ClampedArray]",E="[object Uint16Array]",O="[object Uint32Array]";var _={};_[g]=_[m]=_[b]=_[x]=_[k]=_[j]=_[w]=_[E]=_[O]=true;_[r]=_[o]=_[y]=_[i]=_[a]=_[s]=_[u]=_[f]=_[l]=_[c]=_[v]=_[d]=_[p]=_[h]=false;function N(e){return!!e&&typeof e=="object"}var C=Object.prototype;var A=C.toString;var T=Math.pow(2,53)-1;function S(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=T}function I(e){return N(e)&&S(e.length)&&!!_[A.call(e)]}t.exports=I},{}],14:[function(e,t,n){var r=e("lodash.isarguments"),o=e("lodash.isarray"),i=e("lodash.isnative");var a=Object.prototype;var s=a.hasOwnProperty;var u=a.propertyIsEnumerable;var f=i(f=Object.keys)&&f;var l=Math.pow(2,53)-1;var c={};(function(e){try{c.nonEnumArgs=!u.call(arguments,1)}catch(t){c.nonEnumArgs=true}})(0,0);function v(e,t){e=+e;t=t==null?l:t;return e>-1&&e%1==0&&e<t}function d(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=l}function p(e){var t=g(e),n=t.length,i=n&&e.length;var a=i&&d(i)&&(o(e)||c.nonEnumArgs&&r(e));var u=-1,f=[];while(++u<n){var l=t[u];if(a&&v(l,i)||s.call(e,l)){f.push(l)}}return f}function h(e){var t=typeof e;return t=="function"||!!e&&t=="object"}var y=!f?p:function(e){if(e){var t=e.constructor,n=e.length}if(typeof t=="function"&&t.prototype===e||typeof e!="function"&&(n&&d(n))){return p(e)}return h(e)?f(e):[]};function g(e){if(e==null){return[]}if(!h(e)){e=Object(e)}var t=e.length;t=t&&d(t)&&(o(e)||c.nonEnumArgs&&r(e))&&t||0;var n=e.constructor,i=-1,a=typeof n=="function"&&n.prototype===e,u=Array(t),f=t>0;while(++i<t){u[i]=i+""}for(var l in e){if(!(f&&v(l,t))&&!(l=="constructor"&&(a||!s.call(e,l)))){u.push(l)}}return u}t.exports=y},{"lodash.isarguments":9,"lodash.isarray":10,"lodash.isnative":11}],15:[function(e,t,n){var r=e("lodash.isarguments"),o=e("lodash.isarray");var i=Object.prototype;var a=i.hasOwnProperty;var s=i.propertyIsEnumerable;var u=Math.pow(2,53)-1;var f={};(function(e){try{f.nonEnumArgs=!s.call(arguments,1)}catch(t){f.nonEnumArgs=true}})(0,0);function l(e,t){e=+e;t=t==null?u:t;return e>-1&&e%1==0&&e<t}function c(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=u}function v(e){var t=typeof e;return t=="function"||!!e&&t=="object"}function d(e){if(e==null){return[]}if(!v(e)){e=Object(e)}var t=e.length;t=t&&c(t)&&(o(e)||f.nonEnumArgs&&r(e))&&t||0;var n=e.constructor,i=-1,s=typeof n=="function"&&n.prototype===e,u=Array(t),d=t>0;while(++i<t){u[i]=i+""}for(var p in e){if(!(d&&l(p,t))&&!(p=="constructor"&&(s||!a.call(e,p)))){u.push(p)}}return u}t.exports=d},{"lodash.isarguments":9,"lodash.isarray":10}],16:[function(e,t,n){var r=e("lodash._basecopy"),o=e("lodash.keysin");function i(e){return r(e,o(e))}t.exports=i},{"lodash._basecopy":17,"lodash.keysin":15}],17:[function(e,t,n){function r(e,t,n){if(!n){n=t;t={}}var r=-1,o=n.length;while(++r<o){var i=n[r];t[i]=e[i]}return t}t.exports=r},{}],18:[function(e,t,n){var r=e("./vdom/create-element.js");t.exports=r},{"./vdom/create-element.js":31}],19:[function(e,t,n){var r=e("./vtree/diff.js");t.exports=r},{"./vtree/diff.js":51}],20:[function(e,t,n){var r=e("./virtual-hyperscript/index.js");t.exports=r},{"./virtual-hyperscript/index.js":38}],21:[function(e,t,n){var r=e("./diff.js");var o=e("./patch.js");var i=e("./h.js");var a=e("./create-element.js");var s=e("./vnode/vnode.js");var u=e("./vnode/vtext.js");t.exports={diff:r,patch:o,h:i,create:a,VNode:s,VText:u}},{"./create-element.js":18,"./diff.js":19,"./h.js":20,"./patch.js":29,"./vnode/vnode.js":47,"./vnode/vtext.js":49}],22:[function(e,t,n){t.exports=function r(e){var t=String.prototype.split,n=/()??/.exec("")[1]===e,r;r=function(r,o,i){if(Object.prototype.toString.call(o)!=="[object RegExp]"){return t.call(r,o,i)}var a=[],s=(o.ignoreCase?"i":"")+(o.multiline?"m":"")+(o.extended?"x":"")+(o.sticky?"y":""),u=0,o=new RegExp(o.source,s+"g"),f,l,c,v;r+="";if(!n){f=new RegExp("^"+o.source+"$(?!\\s)",s)}i=i===e?-1>>>0:i>>>0;while(l=o.exec(r)){c=l.index+l[0].length;if(c>u){a.push(r.slice(u,l.index));if(!n&&l.length>1){l[0].replace(f,function(){for(var t=1;t<arguments.length-2;t++){if(arguments[t]===e){l[t]=e}}})}if(l.length>1&&l.index<r.length){Array.prototype.push.apply(a,l.slice(1))}v=l[0].length;u=c;if(a.length>=i){break}}if(o.lastIndex===l.index){o.lastIndex++}}if(u===r.length){if(v||!o.test("")){a.push("")}}else{a.push(r.slice(u))}return a.length>i?a.slice(0,i):a};return r}()},{}],23:[function(e,t,n){"use strict";var r=e("individual/one-version");var o="7";r("ev-store",o);var i="__EV_STORE_KEY@"+o;t.exports=a;function a(e){var t=e[i];if(!t){t=e[i]={}}return t}},{"individual/one-version":25}],24:[function(e,t,n){(function(e){"use strict";var n=typeof window!=="undefined"?window:typeof e!=="undefined"?e:{};t.exports=r;function r(e,t){if(e in n){return n[e]}n[e]=t;return t}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],25:[function(e,t,n){"use strict";var r=e("./index.js");t.exports=o;function o(e,t,n){var o="__INDIVIDUAL_ONE_VERSION_"+e;var i=o+"_ENFORCE_SINGLETON";var a=r(i,t);if(a!==t){throw new Error("Can only have one copy of "+e+".\n"+"You already have version "+a+" installed.\n"+"This means you cannot install version "+t)}return r(o,n)}},{"./index.js":24}],26:[function(e,t,n){(function(n){var r=typeof n!=="undefined"?n:typeof window!=="undefined"?window:{};var o=e("min-document");if(typeof document!=="undefined"){t.exports=document}else{var i=r["__GLOBAL_DOCUMENT_CACHE@4"];if(!i){i=r["__GLOBAL_DOCUMENT_CACHE@4"]=o}t.exports=i}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"min-document":1}],27:[function(e,t,n){"use strict";t.exports=function r(e){return typeof e==="object"&&e!==null}},{}],28:[function(e,t,n){var r=Array.isArray;var o=Object.prototype.toString;t.exports=r||i;function i(e){return o.call(e)==="[object Array]"}},{}],29:[function(e,t,n){var r=e("./vdom/patch.js");t.exports=r},{"./vdom/patch.js":34}],30:[function(e,t,n){var r=e("is-object");var o=e("../vnode/is-vhook.js");t.exports=i;function i(e,t,n){for(var i in t){var u=t[i];if(u===undefined){a(e,i,u,n)}else if(o(u)){a(e,i,u,n);if(u.hook){u.hook(e,i,n?n[i]:undefined)}}else{if(r(u)){s(e,t,n,i,u)}else{e[i]=u}}}}function a(e,t,n,r){if(r){var i=r[t];if(!o(i)){if(t==="attributes"){for(var a in i){e.removeAttribute(a)}}else if(t==="style"){for(var s in i){e.style[s]=""}}else if(typeof i==="string"){e[t]=""}else{e[t]=null}}else if(i.unhook){i.unhook(e,t,n)}}}function s(e,t,n,o,i){var a=n?n[o]:undefined;if(o==="attributes"){for(var s in i){var f=i[s];if(f===undefined){e.removeAttribute(s)}else{e.setAttribute(s,f)}}return}if(a&&r(a)&&u(a)!==u(i)){e[o]=i;return}if(!r(e[o])){e[o]={}}var l=o==="style"?"":undefined;for(var c in i){var v=i[c];e[o][c]=v===undefined?l:v}}function u(e){if(Object.getPrototypeOf){return Object.getPrototypeOf(e)}else if(e.__proto__){return e.__proto__}else if(e.constructor){return e.constructor.prototype}}},{"../vnode/is-vhook.js":42,"is-object":27}],31:[function(e,t,n){var r=e("global/document");var o=e("./apply-properties");var i=e("../vnode/is-vnode.js");var a=e("../vnode/is-vtext.js");var s=e("../vnode/is-widget.js");var u=e("../vnode/handle-thunk.js");t.exports=f;function f(e,t){var n=t?t.document||r:r;var l=t?t.warn:null;e=u(e).a;if(s(e)){return e.init()}else if(a(e)){return n.createTextNode(e.text)}else if(!i(e)){if(l){l("Item is not a valid virtual dom node",e)}return null}var c=e.namespace===null?n.createElement(e.tagName):n.createElementNS(e.namespace,e.tagName);var v=e.properties;o(c,v);var d=e.children;for(var p=0;p<d.length;p++){var h=f(d[p],t);if(h){c.appendChild(h)}}return c}},{"../vnode/handle-thunk.js":40,"../vnode/is-vnode.js":43,"../vnode/is-vtext.js":44,"../vnode/is-widget.js":45,"./apply-properties":30,"global/document":26}],32:[function(e,t,n){var r={};t.exports=o;function o(e,t,n,r){if(!n||n.length===0){return{}}else{n.sort(s);return i(e,t,n,r,0)}}function i(e,t,n,o,s){o=o||{};if(e){if(a(n,s,s)){o[s]=e}var u=t.children;if(u){var f=e.childNodes;for(var l=0;l<t.children.length;l++){s+=1;var c=u[l]||r;var v=s+(c.count||0);if(a(n,s,v)){i(f[l],c,n,o,s)}s=v}}}return o}function a(e,t,n){if(e.length===0){return false}var r=0;var o=e.length-1;var i;var a;while(r<=o){i=(o+r)/2>>0;a=e[i];if(r===o){return a>=t&&a<=n}else if(a<t){r=i+1}else if(a>n){o=i-1}else{return true}}return false}function s(e,t){return e>t?1:-1}},{}],33:[function(e,t,n){var r=e("./apply-properties");var o=e("../vnode/is-widget.js");var i=e("../vnode/vpatch.js");var a=e("./create-element");var s=e("./update-widget");t.exports=u;function u(e,t,n){var o=e.type;var a=e.vNode;var s=e.patch;switch(o){case i.REMOVE:return f(t,a);case i.INSERT:return l(t,s,n);case i.VTEXT:return c(t,a,s,n);case i.WIDGET:return v(t,a,s,n);case i.VNODE:return d(t,a,s,n);case i.ORDER:h(t,s);return t;case i.PROPS:r(t,s,a.properties);return t;case i.THUNK:return y(t,n.patch(t,s,n));default:return t}}function f(e,t){var n=e.parentNode;if(n){n.removeChild(e)}p(e,t);return null}function l(e,t,n){var r=a(t,n);if(e){e.appendChild(r)}return e}function c(e,t,n,r){var o;if(e.nodeType===3){e.replaceData(0,e.length,n.text);o=e}else{var i=e.parentNode;o=a(n,r);if(i&&o!==e){i.replaceChild(o,e)}}return o}function v(e,t,n,r){var o=s(t,n);var i;if(o){i=n.update(t,e)||e}else{i=a(n,r)}var u=e.parentNode;if(u&&i!==e){u.replaceChild(i,e)}if(!o){p(e,t)}return i}function d(e,t,n,r){var o=e.parentNode;var i=a(n,r);if(o&&i!==e){o.replaceChild(i,e)}return i}function p(e,t){if(typeof t.destroy==="function"&&o(t)){t.destroy(e)}}function h(e,t){var n=e.childNodes;var r={};var o;var i;var a;for(var s=0;s<t.removes.length;s++){i=t.removes[s];o=n[i.from];if(i.key){r[i.key]=o}e.removeChild(o)}var u=n.length;for(var f=0;f<t.inserts.length;f++){a=t.inserts[f];o=r[a.key];e.insertBefore(o,a.to>=u++?null:n[a.to])}}function y(e,t){if(e&&t&&e!==t&&e.parentNode){e.parentNode.replaceChild(t,e)}return t}},{"../vnode/is-widget.js":45,"../vnode/vpatch.js":48,"./apply-properties":30,"./create-element":31,"./update-widget":35}],34:[function(e,t,n){var r=e("global/document");var o=e("x-is-array");var i=e("./dom-index");var a=e("./patch-op");t.exports=s;function s(e,t){return u(e,t)}function u(e,t,n){var o=l(t);if(o.length===0){return e}var a=i(e,t.a,o);var s=e.ownerDocument;if(!n){n={patch:u};if(s!==r){n.document=s}}for(var c=0;c<o.length;c++){var v=o[c];e=f(e,a[v],t[v],n)}return e}function f(e,t,n,r){if(!t){return e}var i;if(o(n)){for(var s=0;s<n.length;s++){i=a(n[s],t,r);if(t===e){e=i}}}else{i=a(n,t,r);if(t===e){e=i}}return e}function l(e){var t=[];for(var n in e){if(n!=="a"){t.push(Number(n))}}return t}},{"./dom-index":32,"./patch-op":33,"global/document":26,"x-is-array":28}],35:[function(e,t,n){var r=e("../vnode/is-widget.js");t.exports=o;function o(e,t){if(r(e)&&r(t)){if("name"in e&&"name"in t){return e.id===t.id}else{return e.init===t.init}}return false}},{"../vnode/is-widget.js":45}],36:[function(e,t,n){"use strict";var r=e("ev-store");t.exports=o;function o(e){if(!(this instanceof o)){return new o(e)}this.value=e}o.prototype.hook=function(e,t){var n=r(e);var o=t.substr(3);n[o]=this.value};o.prototype.unhook=function(e,t){var n=r(e);var o=t.substr(3);n[o]=undefined}},{"ev-store":23}],37:[function(e,t,n){"use strict";t.exports=r;function r(e){if(!(this instanceof r)){return new r(e)}this.value=e}r.prototype.hook=function(e,t){if(e[t]!==this.value){e[t]=this.value}}},{}],38:[function(e,t,n){"use strict";var r=e("x-is-array");var o=e("../vnode/vnode.js");var i=e("../vnode/vtext.js");var a=e("../vnode/is-vnode");var s=e("../vnode/is-vtext");var u=e("../vnode/is-widget");var f=e("../vnode/is-vhook");var l=e("../vnode/is-thunk");var c=e("./parse-tag.js");var v=e("./hooks/soft-set-hook.js");var d=e("./hooks/ev-hook.js");t.exports=p;function p(e,t,n){var r=[];var i,a,s,u;if(!n&&m(t)){n=t;a={}}a=a||t||{};i=c(e,a);if(a.hasOwnProperty("key")){s=a.key;a.key=undefined}if(a.hasOwnProperty("namespace")){u=a.namespace;a.namespace=undefined}if(i==="INPUT"&&!u&&a.hasOwnProperty("value")&&a.value!==undefined&&!f(a.value)){a.value=v(a.value)}y(a);if(n!==undefined&&n!==null){h(n,r,i,a)}return new o(i,a,r,s,u)}function h(e,t,n,o){if(typeof e==="string"){t.push(new i(e))}else if(g(e)){t.push(e)}else if(r(e)){for(var a=0;a<e.length;a++){h(e[a],t,n,o)}}else if(e===null||e===undefined){return}else{throw b({foreignObject:e,parentVnode:{tagName:n,properties:o}})}}function y(e){for(var t in e){if(e.hasOwnProperty(t)){var n=e[t];if(f(n)){continue}if(t.substr(0,3)==="ev-"){e[t]=d(n)}}}}function g(e){return a(e)||s(e)||u(e)||l(e)}function m(e){return typeof e==="string"||r(e)||g(e)}function b(e){var t=new Error;t.type="virtual-hyperscript.unexpected.virtual-element";t.message="Unexpected virtual child passed to h().\n"+"Expected a VNode / Vthunk / VWidget / string but:\n"+"got:\n"+x(e.foreignObject)+".\n"+"The parent vnode is:\n"+x(e.parentVnode);"\n"+"Suggested fix: change your `h(..., [ ... ])` callsite.";t.foreignObject=e.foreignObject;t.parentVnode=e.parentVnode;return t}function x(e){try{return JSON.stringify(e,null,"    ")}catch(t){return String(e)}}},{"../vnode/is-thunk":41,"../vnode/is-vhook":42,"../vnode/is-vnode":43,"../vnode/is-vtext":44,"../vnode/is-widget":45,"../vnode/vnode.js":47,"../vnode/vtext.js":49,"./hooks/ev-hook.js":36,"./hooks/soft-set-hook.js":37,"./parse-tag.js":39,"x-is-array":28}],39:[function(e,t,n){"use strict";var r=e("browser-split");var o=/([\.#]?[a-zA-Z0-9_:-]+)/;var i=/^\.|#/;t.exports=a;function a(e,t){if(!e){return"DIV"}var n=!t.hasOwnProperty("id");var a=r(e,o);var s=null;if(i.test(a[1])){s="DIV"}var u,f,l,c;for(c=0;c<a.length;c++){f=a[c];if(!f){continue}l=f.charAt(0);if(!s){s=f}else if(l==="."){u=u||[];u.push(f.substring(1,f.length))}else if(l==="#"&&n){t.id=f.substring(1,f.length)}}if(u){if(t.className){u.push(t.className)}t.className=u.join(" ")}return t.namespace?s:s.toUpperCase()}},{"browser-split":22}],40:[function(e,t,n){var r=e("./is-vnode");var o=e("./is-vtext");var i=e("./is-widget");var a=e("./is-thunk");t.exports=s;function s(e,t){var n=e;var r=t;if(a(t)){r=u(t,e)}if(a(e)){n=u(e,null)}return{a:n,b:r}}function u(e,t){var n=e.vnode;if(!n){n=e.vnode=e.render(t)}if(!(r(n)||o(n)||i(n))){throw new Error("thunk did not return a valid node")}return n}},{"./is-thunk":41,"./is-vnode":43,"./is-vtext":44,"./is-widget":45}],41:[function(e,t,n){t.exports=r;function r(e){return e&&e.type==="Thunk"}},{}],42:[function(e,t,n){t.exports=r;function r(e){return e&&(typeof e.hook==="function"&&!e.hasOwnProperty("hook")||typeof e.unhook==="function"&&!e.hasOwnProperty("unhook"))}},{}],43:[function(e,t,n){var r=e("./version");t.exports=o;function o(e){return e&&e.type==="VirtualNode"&&e.version===r}},{"./version":46}],44:[function(e,t,n){var r=e("./version");t.exports=o;function o(e){return e&&e.type==="VirtualText"&&e.version===r}},{"./version":46}],45:[function(e,t,n){t.exports=r;function r(e){return e&&e.type==="Widget"}},{}],46:[function(e,t,n){t.exports="2"},{}],47:[function(e,t,n){var r=e("./version");var o=e("./is-vnode");var i=e("./is-widget");var a=e("./is-thunk");var s=e("./is-vhook");t.exports=l;var u={};var f=[];function l(e,t,n,r,l){this.tagName=e;this.properties=t||u;this.children=n||f;this.key=r!=null?String(r):undefined;this.namespace=typeof l==="string"?l:null;var c=n&&n.length||0;var v=0;var d=false;var p=false;var h=false;var y;for(var g in t){if(t.hasOwnProperty(g)){var m=t[g];if(s(m)&&m.unhook){if(!y){y={}}y[g]=m}}}for(var b=0;b<c;b++){var x=n[b];if(o(x)){v+=x.count||0;if(!d&&x.hasWidgets){d=true}if(!p&&x.hasThunks){p=true}if(!h&&(x.hooks||x.descendantHooks)){h=true}}else if(!d&&i(x)){if(typeof x.destroy==="function"){d=true}}else if(!p&&a(x)){p=true}}this.count=c+v;this.hasWidgets=d;this.hasThunks=p;this.hooks=y;this.descendantHooks=h}l.prototype.version=r;l.prototype.type="VirtualNode"},{"./is-thunk":41,"./is-vhook":42,"./is-vnode":43,"./is-widget":45,"./version":46}],48:[function(e,t,n){var r=e("./version");o.NONE=0;o.VTEXT=1;o.VNODE=2;o.WIDGET=3;o.PROPS=4;o.ORDER=5;o.INSERT=6;o.REMOVE=7;o.THUNK=8;t.exports=o;function o(e,t,n){this.type=Number(e);this.vNode=t;this.patch=n}o.prototype.version=r;o.prototype.type="VirtualPatch"},{"./version":46}],49:[function(e,t,n){var r=e("./version");t.exports=o;function o(e){this.text=String(e)}o.prototype.version=r;o.prototype.type="VirtualText"},{"./version":46}],50:[function(e,t,n){var r=e("is-object");var o=e("../vnode/is-vhook");t.exports=i;function i(e,t){var n;for(var s in e){if(!(s in t)){n=n||{};n[s]=undefined}var u=e[s];var f=t[s];if(u===f){continue}else if(r(u)&&r(f)){if(a(f)!==a(u)){n=n||{};n[s]=f}else if(o(f)){n=n||{};n[s]=f}else{var l=i(u,f);if(l){n=n||{};n[s]=l}}}else{n=n||{};n[s]=f}}for(var c in t){if(!(c in e)){n=n||{};n[c]=t[c]}}return n}function a(e){if(Object.getPrototypeOf){return Object.getPrototypeOf(e)}else if(e.__proto__){return e.__proto__}else if(e.constructor){return e.constructor.prototype}}},{"../vnode/is-vhook":42,"is-object":27}],51:[function(e,t,n){var r=e("x-is-array");var o=e("../vnode/vpatch");var i=e("../vnode/is-vnode");var a=e("../vnode/is-vtext");var s=e("../vnode/is-widget");var u=e("../vnode/is-thunk");var f=e("../vnode/handle-thunk");var l=e("./diff-props");t.exports=c;function c(e,t){var n={a:e};v(e,t,n,0);return n}function v(e,t,n,r){if(e===t){return}var f=n[r];var c=false;if(u(e)||u(t)){y(e,t,n,r)}else if(t==null){if(!s(e)){p(e,n,r);f=n[r]}f=w(f,new o(o.REMOVE,e,t))}else if(i(t)){if(i(e)){if(e.tagName===t.tagName&&e.namespace===t.namespace&&e.key===t.key){var v=l(e.properties,t.properties);if(v){f=w(f,new o(o.PROPS,e,v))}f=d(e,t,n,f,r)}else{f=w(f,new o(o.VNODE,e,t));c=true}}else{f=w(f,new o(o.VNODE,e,t));c=true}}else if(a(t)){if(!a(e)){f=w(f,new o(o.VTEXT,e,t));c=true}else if(e.text!==t.text){f=w(f,new o(o.VTEXT,e,t))}}else if(s(t)){if(!s(e)){c=true}f=w(f,new o(o.WIDGET,e,t))}if(f){n[r]=f}if(c){p(e,n,r)}}function d(e,t,n,r,a){var s=e.children;var u=x(s,t.children);var f=u.children;var l=s.length;var c=f.length;var d=l>c?l:c;for(var p=0;p<d;p++){var h=s[p];var y=f[p];a+=1;if(!h){if(y){r=w(r,new o(o.INSERT,null,y))}}else{v(h,y,n,a)}if(i(h)&&h.count){a+=h.count}}if(u.moves){r=w(r,new o(o.ORDER,e,u.moves))}return r}function p(e,t,n){m(e,t,n);h(e,t,n)}function h(e,t,n){if(s(e)){if(typeof e.destroy==="function"){t[n]=w(t[n],new o(o.REMOVE,e,null))}}else if(i(e)&&(e.hasWidgets||e.hasThunks)){var r=e.children;var a=r.length;for(var f=0;f<a;f++){var l=r[f];n+=1;h(l,t,n);if(i(l)&&l.count){n+=l.count}}}else if(u(e)){y(e,null,t,n)}}function y(e,t,n,r){var i=f(e,t);var a=c(i.a,i.b);if(g(a)){n[r]=new o(o.THUNK,null,a)}}function g(e){for(var t in e){if(t!=="a"){return true}}return false}function m(e,t,n){if(i(e)){if(e.hooks){t[n]=w(t[n],new o(o.PROPS,e,b(e.hooks)))}if(e.descendantHooks||e.hasThunks){var r=e.children;var a=r.length;for(var s=0;s<a;s++){var f=r[s];n+=1;m(f,t,n);if(i(f)&&f.count){n+=f.count}}}}else if(u(e)){y(e,null,t,n)}}function b(e){var t={};for(var n in e){t[n]=undefined}return t}function x(e,t){var n=j(t);var r=n.keys;var o=n.free;if(o.length===t.length){return{children:t,moves:null}}var i=j(e);var a=i.keys;var s=i.free;if(s.length===e.length){return{children:t,moves:null}}var u=[];var f=0;var l=o.length;var c=0;for(var v=0;v<e.length;v++){var d=e[v];var p;if(d.key){if(r.hasOwnProperty(d.key)){p=r[d.key];u.push(t[p])}else{p=v-c++;u.push(null)}}else{if(f<l){p=o[f++];u.push(t[p])}else{p=v-c++;u.push(null)}}}var h=f>=o.length?t.length:o[f];for(var y=0;y<t.length;y++){var g=t[y];if(g.key){if(!a.hasOwnProperty(g.key)){u.push(g)}}else if(y>=h){u.push(g)}}var m=u.slice();var b=0;var x=[];var w=[];var E;for(var O=0;O<t.length;){var _=t[O];E=m[b];while(E===null&&m.length){x.push(k(m,b,null));E=m[b]}if(!E||E.key!==_.key){if(_.key){if(E&&E.key){if(r[E.key]!==O+1){x.push(k(m,b,E.key));E=m[b];if(!E||E.key!==_.key){w.push({key:_.key,to:O})}else{b++}}else{w.push({key:_.key,to:O})}}else{w.push({key:_.key,to:O})}O++}else if(E&&E.key){x.push(k(m,b,E.key))}}else{b++;O++}}while(b<m.length){E=m[b];x.push(k(m,b,E&&E.key))}if(x.length===c&&!w.length){return{children:u,moves:null}}return{children:u,moves:{removes:x,inserts:w}}}function k(e,t,n){e.splice(t,1);return{from:t,key:n}}function j(e){var t={};var n=[];var r=e.length;for(var o=0;o<r;o++){var i=e[o];if(i.key){t[i.key]=o}else{n.push(o)}}return{keys:t,free:n}}function w(e,t){if(e){if(r(e)){e.push(t)}else{e=[e,t]}return e}else{return t}}},{"../vnode/handle-thunk":40,"../vnode/is-thunk":41,"../vnode/is-vnode":43,"../vnode/is-vtext":44,"../vnode/is-widget":45,"../vnode/vpatch":48,"./diff-props":50,"x-is-array":28}],52:[function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e};var o=e("lodash.merge");var i=r(o);var a=e("virtual-dom");var s=e("virtual-dom/create-element");var u=r(s);function f(e,t,n){this.render=e.bind(this);this.props=t;this.tree=this.render(t);this.node=u(this.tree);n.appendChild(this.node)}f.prototype.setProps=function(e){this.props=i(this.props,e);var t=this.render(this.props);this.node=a.patch(this.node,a.diff(this.tree,t));this.tree=t;return this};function l(e,t,n){return new f(e,t,n)}function c(e){return l.bind(null,e)}t.exports=c},{"lodash.merge":2,"virtual-dom":21,"virtual-dom/create-element":18}],53:[function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e};var o=e("virtual-dom");var i=e("./element");var a=r(i);function s(e){return o.h("div",{style:{"z-index":10,position:"absolute",padding:"5px 10px",backgroundColor:"white",display:e.visible?"block":"none",maxWidth:"100%",top:e.positionTop+"px"}},[o.h("span",{style:{"float":"left",padding:"10px",cursor:"pointer"},onclick:e.onCloseClick.bind(this)},"x"),o.h("input",{style:{width:"100%","float":"left"},onclick:e.onInputClick.bind(this),readOnly:true,value:e.href}),o.h("a",{style:{"float":"left",maxWidth:"inherit"},target:"_blank",href:e.href},[o.h("img",{style:{"float":"left",maxWidth:"inherit"},src:e.href})])])}t.exports=a(s)},{"./element":52,"virtual-dom":21}],54:[function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e};var o=e("./elements/modal");var i=r(o);var a;var s=new Dropbox.Client({key:"0vbn09clhc23rc5"});var u=i({onCloseClick:function m(){this.setProps({visible:false})},onInputClick:function b(e){e.target.select()}},document.body);(function(){var e=document.createElement("style");e.type="text/css";e.innerHTML="\n      .tile {\n        width: 64px; height: 64px; background-color: white;\n        margin: 3px;\n        float: left; text-align: center;\n      }\n    ";document.head.appendChild(e);document.body.style.backgroundColor="#DFFEE3";document.body.style.margin="0"})();function f(){Array.prototype.forEach.call(document.body.querySelectorAll(".tile"),document.body.removeChild.bind(document.body))}function l(){if(document.body.querySelector(".tile.more")){document.body.removeChild(document.body.querySelector(".tile.more"))}}(function(){var e=document.createElement("form");e.action="#";e.onsubmit=function(e){e.target[0].style.backgroundColor="white";var t=e.target[0].value;if(!t){f();y(0);return false}var n;try{n=new RegExp(t,"i")}catch(r){n=null}var o=[];var i;for(var s=0;s<a.length;s++){i=a[s].name.toLowerCase();if(i.indexOf(t)!==-1){o.push(a[s])}else if(n&&n.test(i)){o.push(a[s])}}if(!o.length){e.target[0].style.backgroundColor="#AC281C";return false}f();for(var s=0;s<o.length;s++){h(o[s])}return false};var t=document.createElement("input");t.style.width="60%";t.style.margin="10px auto";t.style.display="block";e.appendChild(t);document.body.appendChild(e)})();var c="/Public/gifmess/";function v(e){u.setProps({href:e,visible:true,positionTop:window.scrollY+10})}function d(e){var t="cachedShare-"+e.target.dataset.versiontag;var n=localStorage.getItem(t);if(n){v(n)}else{s.makeUrl(e.target.dataset.original,{downloadHack:true},function(e,n){v(n.url);localStorage.setItem(t,n.url)})}}function p(e,t){var n=document.createElement("canvas");var r=n.getContext("2d");n.height=e.height;n.width=e.width;r.drawImage(e,0,0);localStorage.setItem("cachedImg-"+t,n.toDataURL("image/png"));r=n=null}s.authenticate();function h(e){if(!e.hasThumbnail){return}var t=document.createElement("div");t.className="tile";var n=new Image;n.onclick=d;n.dataset.original=e.path;n.dataset.versiontag=e.versionTag;var r=localStorage.getItem("cachedImg-"+e.versionTag);if(r){n.src=r}else{n.crossOrigin="anonymous";n.src=s.thumbnailUrl(n.dataset.original,{png:true});n.onload=p.bind(null,n,e.versionTag)}t.appendChild(n);document.body.appendChild(t)}function y(e){e=e||0;for(var t=e;t<a.length&&t<e+50;t++){h(a[t])}l();if(e+50<a.length){g(e+50)}}function g(e){var t=document.createElement("div");t.className="tile more";var n=document.createElement("span");n.textContent="+";n.style.padding="10px";n.style.margin="10px";n.style.cursor="pointer";n.onclick=y.bind(null,e);t.appendChild(n);document.body.appendChild(t)}s.readdir(c,function(e,t,n,r){a=r.slice();a.reverse();y(0)})},{"./elements/modal":53}]},{},[54]);