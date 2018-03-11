"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var serializeVersion = function serializeVersion(version) {
  var parent = version.parent;
  var nodes = version.nodes.map(function (node) {
    return (0, _lodash.pick)(node, ["id", "data"]);
  });
  var output = {
    id: version.id
  };

  if (parent) {
    output.parent = parent.id;
  }

  if (nodes.length > 0) {
    output.nodes = nodes;
  }

  return output;
};

var serialize = function serialize(treelogy) {
  var versions = treelogy.versions.map(function (version) {
    return serializeVersion(version);
  });

  return { versions: versions };
};

exports.default = serialize;