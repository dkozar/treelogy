"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _Version = require("./Version");

var _Version2 = _interopRequireDefault(_Version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Treelogy = function Treelogy() {
  var _this = this;

  _classCallCheck(this, Treelogy);

  this.versions = [];

  this.createVersion = function (versionId, parentVersionId) {
    if (_this.getVersionIndex(versionId) > -1) {
      throw new Error("Version ID must be unique: " + versionId);
    }

    var version = new _Version2.default(versionId);

    if (parentVersionId) {
      var parentVersion = _this.getVersion(parentVersionId);

      if (parentVersion) {
        version.inherits(parentVersion);
      }
    }

    _this.versions.push(version);

    return version;
  };

  this.deleteVersion = function (versionId) {
    var index = _this.getVersionIndex(versionId);

    if (index === -1) {
      throw new Error("Cannot find version: " + versionId);
    }

    var version = _this.versions[index];

    _this.versions.splice(index, 1);
    version.destroy();
  };

  this.getVersion = function (versionId) {
    var version = (0, _lodash.find)(_this.versions, function (item) {
      return item.id === versionId;
    });

    if (!version) {
      throw new Error("Cannot find version: " + versionId);
    }

    return version;
  };

  this.getVersionIndex = function (versionId) {
    return _this.versions.findIndex(function (version) {
      return version.id === versionId;
    });
  };

  this.getVersions = function () {
    return _this.versions;
  };

  this.clear = function () {
    _this.versions.forEach(function (version) {
      return version.destroy();
    });
    _this.versions = [];
  };

  this.process = function () {
    return _this.versions.map(function (version) {
      return version.build();
    });
  };
}

/**
 * Creates a new version
 * @param versionId
 * @param parentVersionId
 */


/**
 * Deletes a version specified by ID
 * @param versionId
 */


/**
 * Gets version by ID
 * @param versionId
 */


/**
 * Gets version index
 * @param versionId
 * @returns {number}
 */


/**
 * Gets all versions
 * @returns {Array}
 */


/**
 * Removes all versions
 */


/**
 * Builds an array of processed versions
 * Each version contains a full set of nodes, set of inherited IDs and set of overridden IDs
 * @returns {Array<{id: Version.id, nodes: Array, inherited: {}, overrides: {}}>}
 */
;

exports.default = Treelogy;