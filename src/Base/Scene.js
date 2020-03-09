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

  /**
   * @param {number|undefined} duration
   */
  show = duration => this.active.to(1, duration);

  /**
   * @param {number|undefined} duration
   */
  hide = duration => this.active.to(0, duration);
}
