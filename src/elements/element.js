import {merge} from 'ramda'

import {diff, patch} from 'virtual-dom'
import createElement from 'virtual-dom/create-element'

function Element(render, props, rootNode) {
  this.render = render.bind(this)
  this.props = props
  this.tree = this.render(props)
  this.node = createElement(this.tree)

  rootNode.appendChild(this.node)
}

Element.prototype.setProps = function(newProps) {
  this.props = merge(this.props, newProps)
  var newTree = this.render(this.props)
  this.node = patch(this.node, diff(this.tree, newTree))
  this.tree = newTree

  return this
}

function elementFactory(treeFunc, props, rootNode) {
  return new Element(treeFunc, props, rootNode)
}

function elementFactoryWrapper(treeFunc) {
  return elementFactory.bind(null, treeFunc)
}

export default elementFactoryWrapper
