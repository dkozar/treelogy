import mapNodes from "./mapNodes";

/**
 * Merges an array of parent and child version nodes
 * @param parentNodes
 * @param childNodes
 * @returns {Array}
 */
const overrideNodes = (parentNodes, childNodes) => {
  const parentNodesIdMap = mapNodes(parentNodes);
  const childNodesIdMap = mapNodes(childNodes);
  const output = [];

  /**
   * 1. Process list of parent nodes first, minding overrides
   */
  parentNodes.forEach(parentNode => {
    const id = parentNode.id;
    const childNode = childNodesIdMap[id];

    // if child node exists, it overrides the parent node
    output.push(childNode || parentNode);
  });

  /**
   * 2. Process child nodes that do not exist in the parent
   */
  childNodes.forEach(childNode => {
    const id = childNode.id;
    const parentNode = parentNodesIdMap[id];

    if (parentNode) {
      return;
    }

    output.push(childNode);
  });

  return output;
};

export default overrideNodes;