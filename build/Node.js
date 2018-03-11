/**
 * A structure holding the ID and data
 * The data could be anything
 */
export default class Node {
  constructor(id, data) {
    _initialiseProps.call(this);

    if (!id) {
      throw new Error("Node should have id");
    }

    this.id = String(id);
    this.data = data;
  }

  /**
   * Updates data
   * @param data
   */
}

var _initialiseProps = function () {
  this.update = data => {
    this.data = data;
  };
};