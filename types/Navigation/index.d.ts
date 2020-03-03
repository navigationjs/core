export namespace EVENTS {
  export const LOCK: string;
  export const UNLOCK: string;
  export const ID: string;
}
/**
 * @typedef {import("../Base/Navigator").default} Navigator
 */
export class Navigation {
  /**
   * @type {{ [name: string]: Navigator }}
   */
  navigators: {
    [name: string]: Navigator;
  };
  /**
   * @type {History}
   */
  history: History;
  locked: boolean;
  lockCounter: number;
  /**
   * @param {string} eventId
   * @param {Function} fn
   */
  on: (eventId: string, fn: Function) => void;
  /**
   * @param {string} eventId
   * @param {Function} fn
   */
  once: (eventId: string, fn: Function) => void;
  /**
   * @param {string} eventId
   * @param {Function} fn
   */
  off: (eventId: string, fn: Function) => void;
  /**
   * @param {string} eventId
   * @param {any} [args]
   */
  emit: (eventId: string, args?: any) => void;
  /**
   * @param {...Navigator} navigators
   */
  addNavigators: (...navigators: import('../Base/Navigator').default[]) => void;
  /**
   * @param {...string} navigators
   */
  removeNavigators: (...navigators: string[]) => void;
  lock: () => void;
  unlock: () => void;
  wait: () => Promise<any>;
  /**
   * @param {string} navigatorName
   */
  push: (navigatorName: string) => void;
  pop: () => void;
  /**
   * @param {string} navigatorName
   * @param {string} sceneName
   */
  go: (navigatorName: string, sceneName: string) => Promise<void>;
  back: () => Promise<void>;
  reset: () => Promise<void[]>;
  current: () => string;
  id: () => string | undefined;
  /**
   * @param {string} id
   * @param {string} navigatorName
   */
  pass: (id: string, navigatorName: string) => void;
  /**
   * @type {string | undefined}
   */
  __id: string | undefined;
  __onHistoryChange: () => void;
}
declare var _default: Navigation;
export default _default;
export type Navigator = import('../Base/Navigator').default;
import History from '../History';
