"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapNodes = require("./mapNodes");

var _mapNodes2 = _interopRequireDefault(_mapNodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Merges an array of parent and child version nodes
 * @param parentNodes
 * @param childNodes
 * @returns {Array}
 */
var overrideNodes = function overrideNodes(parentNodes, childNodes) {
  var parentNodesIdMap = (0, _mapNodes2.default)(parentNodes);
  var childNodesIdMap = (0, _mapNodes2.default)(childNodes);
  var output = [];

  /**
   * 1. Process list of parent nodes first, minding overrides
   */
  parentNodes.forEach(function (parentNode) {
    var id = parentNode.id;
    var childNode = childNodesIdMap[id];

    // if child node exists, it overrides the parent node
    output.push(childNode || parentNode);
  });

  /**
   * 2. Process child nodes that do not exist in the parent
   */
  childNodes.forEach(function (childNode) {
    var id = childNode.id;
    var parentNode = parentNodesIdMap[id];

    if (parentNode) {
      return;
    }

    output.push(childNode);
  });

  return output;
};

exports.default = overrideNodes;