"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mapNodes = function mapNodes(nodes) {
  return nodes.reduce(function (map, node) {
    map[node.id] = node;
    return map;
  }, {});
};

exports.default = mapNodes;