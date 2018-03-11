"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A structure holding the ID and data
 * The data could be anything
 */
var Node = function Node(id, data) {
  _classCallCheck(this, Node);

  _initialiseProps.call(this);

  if (!id) {
    throw new Error("Node should have id");
  }

  this.id = String(id);
  this.data = data;
}

/**
 * Updates data
 * @param data
 */
;

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.update = function (data) {
    _this.data = data;
  };
};

exports.default = Node;