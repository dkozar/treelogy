"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _overrideNodes = require("./utils/overrideNodes");

var _overrideNodes2 = _interopRequireDefault(_overrideNodes);

var _Node = require("./Node");

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Version represents a set of nodes
 * Each of the nodes could be individually overridden (by version inheriting from this version)
 */
var Version = function () {
  function Version(id) {
    var _this = this;

    _classCallCheck(this, Version);

    this.id = null;
    this.childVersions = [];
    this.parent = null;
    this.nodes = [];

    this.inherits = function (parent) {
      _this.parent = parent;

      if (parent) {
        _this.parent.childVersions.push(_this);
      }
    };

    this.createNode = function (nodeId, data) {
      _this.nodes.push(new _Node2.default(nodeId, data));
    };

    this.getNode = function (nodeId) {
      return _this.nodes.find(function (node) {
        return node && node.id === nodeId;
      });
    };

    this.getNodeIndex = function (nodeId) {
      return _this.nodes.findIndex(function (node) {
        return node && node.id === nodeId;
      });
    };

    this.updateNode = function (nodeId, data) {
      var nodeInThisVersion = _this.getNode(nodeId);

      if (nodeInThisVersion) {
        nodeInThisVersion.update(data);
      } else {
        _this.createNode(nodeId, data);
      }
    };

    this.removeNode = function (nodeId) {
      var index = _this.getNodeIndex(nodeId);

      _this.nodes.splice(index, 1);
    };

    if (!id) {
      throw new Error("Version should have id");
    }
    this.id = id;
  }

  /**
   * Sets up the inheritance chain
   * @param parent The version to inherit from (could be null)
   */


  /**
   * Creates node
   * @param nodeId Node ID
   * @param data Node data
   */


  /**
   * Gets node by ID
   * @param nodeId Node ID
   * @returns {*}
   */


  /**
   * Gets node index
   * @param nodeId Node ID
   * @returns {Number}
   */


  /**
   * Updates node
   * @param nodeId Node ID
   * @param data New data
   */


  /**
   * Removes node
   * @param nodeId Node ID
   */


  _createClass(Version, [{
    key: "findClosestAncestorsNodeWithId",


    /**
     * Tries to find an ancestor node with ID
     * @param id Node ID
     */
    value: function findClosestAncestorsNodeWithId(id) {
      var current = this;

      while (current.parent) {
        var parent = current.parent;
        var node = parent.getNode(id);

        current = parent;

        if (node) {
          return node;
        }
      }
    }

    /**
     * Gets all ancestor nodes with ID
     * @param id Node ID
     */

  }, {
    key: "findAllAncestorNodesWithId",
    value: function findAllAncestorNodesWithId(id) {
      var nodes = [];
      var current = this;

      while (current.parent) {
        var parent = current.parent;
        var node = parent.getNode(id);

        current = parent;

        if (node) {
          nodes.push(node);
        }
      }

      return nodes;
    }

    /**
     * Gets the parent chain of versions from which this version inherits from
     * @returns {Array}
     */

  }, {
    key: "getParentChain",
    value: function getParentChain() {
      var parentChain = [];
      var current = this;

      while (current.parent) {
        var parent = current.parent;
        parentChain = [].concat(parent, parentChain);

        current = parent;
      }

      return parentChain;
    }

    /**
     * Destroys the node, taking care of connecting its parent to its children
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var parent = this.parent;
      var childVersions = this.childVersions;

      this.parent = null;
      this.childVersions = [];

      if (parent) {
        parent.childVersions = [];
      }

      childVersions.forEach(function (childVersion) {
        childVersion.inherits(parent);
      });
    }

    /**
     * Builds an array of nodes, set of inherited IDs and set of overridden IDs
     * @returns {{id: Version.id, nodes: Array, inherited: {}, overrides: {}}}
     */

  }, {
    key: "build",
    value: function build() {
      var id = this.id;
      // array of nodes

      var nodes = this.nodes;
      // a map of [nodeId, true]
      var overrides = {};
      var inherited = {};
      var idsInThisVersion = nodes.map(function (node) {
        return node.id;
      });
      var output = (0, _overrideNodes2.default)([], nodes);
      var current = this;

      while (current.parent) {
        var parent = current.parent;
        var parentNodes = parent.nodes;
        var idsInParentVersion = parentNodes.map(function (node) {
          return node.id;
        });
        var common = (0, _lodash.intersection)(idsInThisVersion, idsInParentVersion);

        idsInParentVersion.forEach(function (id) {
          inherited[id] = true;
        });

        common.forEach(function (id) {
          overrides[id] = true;
        });

        output = (0, _overrideNodes2.default)(parentNodes, output);
        current = parent;
      }

      return {
        id: id,
        nodes: output,
        inherited: inherited,
        overrides: overrides
      };
    }
  }]);

  return Version;
}();

exports.default = Version;