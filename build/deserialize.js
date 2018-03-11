"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Treelogy = require("./Treelogy");

var _Treelogy2 = _interopRequireDefault(_Treelogy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deserializeVersion = function deserializeVersion(treelogy, data) {
  var version = treelogy.createVersion(data.id, data.parent);
  var nodes = data.nodes || [];

  nodes.forEach(function (node) {
    version.createNode(node.id, node.data);
  });
};

var deserialize = function deserialize(file) {
  var treelogy = new _Treelogy2.default();

  file.versions.forEach(function (treeData) {
    return deserializeVersion(treelogy, treeData);
  });
  return treelogy;
};

exports.default = deserialize;