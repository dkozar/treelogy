import { find } from "lodash";
import Version from "./Version";

export default class Treelogy {
  constructor() {
    this.versions = [];

    this.createVersion = (versionId, parentVersionId) => {
      if (this.getVersionIndex(versionId) > -1) {
        throw new Error(`Version ID must be unique: ${versionId}`);
      }

      const version = new Version(versionId);

      if (parentVersionId) {
        const parentVersion = this.getVersion(parentVersionId);

        if (parentVersion) {
          version.inherits(parentVersion);
        }
      }

      this.versions.push(version);

      return version;
    };

    this.deleteVersion = versionId => {
      const index = this.getVersionIndex(versionId);

      if (index === -1) {
        throw new Error(`Cannot find version: ${versionId}`);
      }

      const version = this.versions[index];

      this.versions.splice(index, 1);
      version.destroy();
    };

    this.getVersion = versionId => {
      const version = find(this.versions, item => {
        return item.id === versionId;
      });

      if (!version) {
        throw new Error(`Cannot find version: ${versionId}`);
      }

      return version;
    };

    this.getVersionIndex = versionId => {
      return this.versions.findIndex(version => version.id === versionId);
    };

    this.getVersions = () => {
      return this.versions;
    };

    this.clear = () => {
      this.versions.forEach(version => version.destroy());
      this.versions = [];
    };

    this.process = () => {
      return this.versions.map(version => version.build());
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


}