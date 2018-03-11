import { pick } from "lodash";

const serializeVersion = version => {
  const parent = version.parent;
  const nodes = version.nodes.map(node => pick(node, ["id", "data"]));
  const output = {
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

const serialize = treelogy => {
  const versions = treelogy.versions.map(version => serializeVersion(version));

  return { versions };
};

export default serialize;