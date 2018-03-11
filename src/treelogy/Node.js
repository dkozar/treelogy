/**
 * A structure holding the ID and data
 * The data could be anything
 */
export default class Node {
  constructor(id, data) {
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
  update = data => {
    this.data = data;
  };
}
