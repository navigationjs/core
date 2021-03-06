import History from '../History';

/**
 * @typedef { import("./Scene").default } Scene
 */

export default class Navigator {
  /**
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
    /**
     * @type {{[key: string]: Scene}}
     */
    this.scenes = {};
    /**
     * @type {History}
     */
    this.history = new History(this.name);
  }

  /**
   * @param {...Scene} scenes
   */
  addScenes = (...scenes) => {
    scenes.forEach(it => (this.scenes[it.name] = it));
  };

  current = () => this.history.current();

  /**
   * @param {string} name
   * @param {number|undefined} duration
   */
  go = async (name, duration) => {
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    const alreadyInHistory = this.history.current() === name;
    if (alreadyInHistory) return Promise.resolve();
    await scene.show(duration);
    this.history.push(name);
  };

  /**
   * @param {number|undefined} duration
   */
  back = async duration => {
    if (this.history.isEmpty()) return Promise.resolve();
    const name = this.current();
    const scene = this.scenes[name];
    if (!scene) return Promise.reject();
    await scene.hide(duration);
    this.history.pop();
  };

  reset = async () => {
    await Promise.all(
      Object.keys(this.scenes).map(key => this.scenes[key].hide())
    );
    this.history = new History(this.name);
  };
}
