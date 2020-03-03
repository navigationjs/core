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
   * @type {History}
   */
  history: History;
  /**
   * @param {...Scene} scenes
   */
  addScenes: (...scenes: import('./Scene').default[]) => void;
  current: () => string;
  /**
   * @param {string} name
   */
  go: (name: string) => Promise<void>;
  back: () => Promise<void>;
  reset: () => Promise<void>;
}
export type Scene = import('./Scene').default;
import History from '../History';
