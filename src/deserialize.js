import Treelogy from "./Treelogy";

const deserializeVersion = (treelogy, data) => {
  const version = treelogy.createVersion(data.id, data.parent);
  const nodes = data.nodes || [];

  nodes.forEach(node => {
    version.createNode(node.id, node.data);
  });
};

const deserialize = file => {
  const treelogy = new Treelogy();

  file.versions.forEach(treeData => deserializeVersion(treelogy, treeData));
  return treelogy;
};

export default deserialize;
