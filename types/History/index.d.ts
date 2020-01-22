export namespace EVENTS {
  export const CHANGE: string;
}
export default class History {
  /**
   * @param {string} name
   */
  constructor(name: string);
  /**
   * @property {string} name
   */
  name: string;
  /**
   * @type {Array<string>}
   */
  chain: Array<string>;
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
  current: () => string;
  isEmpty: () => boolean;
  /**
   * @param {string} name
   */
  push: (name: string) => void;
  pop: () => void;
}
