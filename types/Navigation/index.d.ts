export namespace EVENTS {
  export const LOCK: string;
  export const UNLOCK: string;
  export const WILL_CHANGE: string;
  export const CHANGE: string;
  export const WILL_BLUR: string;
  export const BLUR: string;
  export const WILL_FOCUS: string;
  export const FOCUS: string;
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
   * @param {string} newNavigatorName
   * @param {string} newSceneName
   * @param {number} duration
   */
  go: (
    newNavigatorName: string,
    newSceneName: string,
    duration: number
  ) => Promise<void>;
  /**
   * @param {string} navigatorName
   */
  push: (navigatorName: string) => void;
  pop: () => string | undefined;
  /**
   * @param {number} duration
   */
  back: (duration: number) => Promise<void>;
  reset: () => Promise<void[]>;
  current: () => string;
  id: () => string | undefined;
  /**
   * @param {string?} prevId
   * @param {string?} nextId
   */
  __willChange: (prevId: string | null, nextId: string | null) => void;
  /**
   * @param {string?} prevId
   * @param {string?} nextId
   */
  __change: (prevId: string | null, nextId: string | null) => void;
}
declare var _default: Navigation;
export default _default;
export type Navigator = import('../Base/Navigator').default;
