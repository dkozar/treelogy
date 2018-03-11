import { intersection } from "lodash";
import overrideNodes from "./utils/overrideNodes";
import Node from "./Node";

/**
 * Version represents a set of nodes
 * Each of the nodes could be individually overridden (by version inheriting from this version)
 */
export default class Version {
  id = null;
  childVersions = [];
  parent = null;
  nodes = [];

  constructor(id) {
    if (!id) {
      throw new Error("Version should have id");
    }
    this.id = id;
  }

  /**
   * Sets up the inheritance chain
   * @param parent The version to inherit from (could be null)
   */
  inherits = parent => {
    this.parent = parent;

    if (parent) {
      this.parent.childVersions.push(this);
    }
  };

  /**
   * Creates node
   * @param nodeId Node ID
   * @param data Node data
   */
  createNode = (nodeId, data) => {
    this.nodes.push(new Node(nodeId, data));
  };

  /**
   * Gets node by ID
   * @param nodeId Node ID
   * @returns {*}
   */
  getNode = nodeId => {
    return this.nodes.find(node => {
      return node && node.id === nodeId;
    });
  };

  /**
   * Gets node index
   * @param nodeId Node ID
   * @returns {Number}
   */
  getNodeIndex = nodeId => {
    return this.nodes.findIndex(node => {
      return node && node.id === nodeId;
    });
  };

  /**
   * Updates node
   * @param nodeId Node ID
   * @param data New data
   */
  updateNode = (nodeId, data) => {
    const nodeInThisVersion = this.getNode(nodeId);

    if (nodeInThisVersion) {
      nodeInThisVersion.update(data);
    } else {
      this.createNode(nodeId, data);
    }
  };

  /**
   * Removes node
   * @param nodeId Node ID
   */
  removeNode = nodeId => {
    const index = this.getNodeIndex(nodeId);

    this.nodes.splice(index, 1);
  };

  /**
   * Tries to find an ancestor node with ID
   * @param id Node ID
   */
  findClosestAncestorsNodeWithId(id) {
    let current = this;

    while (current.parent) {
      const parent = current.parent;
      const node = parent.getNode(id);

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
  findAllAncestorNodesWithId(id) {
    const nodes = [];
    let current = this;

    while (current.parent) {
      const parent = current.parent;
      const node = parent.getNode(id);

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
  getParentChain() {
    let parentChain = [];
    let current = this;

    while (current.parent) {
      const parent = current.parent;
      parentChain = [].concat(parent, parentChain);

      current = parent;
    }

    return parentChain;
  }

  /**
   * Destroys the node, taking care of connecting its parent to its children
   */
  destroy() {
    const parent = this.parent;
    const childVersions = this.childVersions;

    this.parent = null;
    this.childVersions = [];

    if (parent) {
      parent.childVersions = [];
    }

    childVersions.forEach(childVersion => {
      childVersion.inherits(parent);
    });
  }

  /**
   * Builds an array of nodes, set of inherited IDs and set of overridden IDs
   * @returns {{id: Version.id, nodes: Array, inherited: {}, overrides: {}}}
   */
  build() {
    const { id } = this;
    // array of nodes
    const nodes = this.nodes;
    // a map of [nodeId, true]
    const overrides = {};
    const inherited = {};
    const idsInThisVersion = nodes.map(node => node.id);
    let output = overrideNodes([], nodes);
    let current = this;

    while (current.parent) {
      const parent = current.parent;
      const parentNodes = parent.nodes;
      const idsInParentVersion = parentNodes.map(node => node.id);
      const common = intersection(idsInThisVersion, idsInParentVersion);

      idsInParentVersion.forEach(id => {
        inherited[id] = true;
      });

      common.forEach(id => {
        overrides[id] = true;
      });

      output = overrideNodes(parentNodes, output);
      current = parent;
    }

    return {
      id,
      nodes: output,
      inherited,
      overrides
    };
  }
}
