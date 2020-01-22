/**
 * @typedef { import("./Scene").default } Scene
 */
export default class Navigator {
  /**
   * @param {string} name
   */
  constructor(name: string);
  name: string;
  /**
   * @type {{[key: string]: Scene}}
   */
  scenes: {
    [key: string]: Scene;
  };
  /**
   * @type {Array<string>}
   */
  history: Array<string>;
  /**
   * @param {...Scene} scenes
   */
  addScenes: (...scenes: import('./Scene').default[]) => void;
  current: () => string;
  /**
   * @param {string} name
   * @param {number} duration
   */
  go: (name: string, duration: number) => Promise<void>;
  /**
   * @param {number} duration
   */
  back: (duration: number) => Promise<void>;
  reset: () => Promise<void>;
}
export type Scene = import('./Scene').default;
