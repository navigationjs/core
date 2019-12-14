/**
 * @typedef {import("../Base/Navigator").default} Navigator
 */
export class Navigation {
  static EVENTS: {
    LOCK: string;
    UNLOCK: string;
    WILL_BLUR: string;
    BLUR: string;
    WILL_FOCUS: string;
    FOCUS: string;
    ANDROID_BACK: string;
  };
  /**
   * @type {{ [name: string]: Navigator }}
   */
  navigators: {
    [name: string]: Navigator;
  };
  /**
   * @type {Array<string>}
   */
  history: Array<string>;
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
  lock: () => void;
  unlock: () => void;
  wait: () => Promise<any>;
  /**
   * @param {string} navigatorName
   * @param {string} sceneName
   * @param {number} duration
   */
  go: (
    navigatorName: string,
    sceneName: string,
    duration: number
  ) => Promise<void>;
  /**
   * @param {string} navigatorName
   */
  push: (navigatorName: string) => void;
  /**
   * @param {string} navigatorName
   * @param {number} duration
   */
  back: (navigatorName: string, duration: number) => Promise<void>;
  reset: () => Promise<void[]>;
  current: () => string;
  /**
   * @param {string} id
   */
  androidBack: (id: string) => void;
  id: () => string | undefined;
}
declare var _default: Navigation;
export default _default;
export type Navigator = import('../Base/Navigator').default;
