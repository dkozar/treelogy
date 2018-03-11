const mapNodes = nodes => {
  return nodes.reduce((map, node) => {
    map[node.id] = node;
    return map;
  }, {});
};

export default mapNodes;