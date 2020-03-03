import Value from '../Value';

export default class Scene {
  /**
   * @param {string} name
   */
  constructor(name) {
    /**
     * @property {string} name
     */

    this.name = name;
    this.active = new Value('active');
  }

  show = () => this.active.to(1);
  hide = () => this.active.to(0);
}
