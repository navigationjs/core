export namespace EVENTS {
  export const WILL_VALUE: string;
  export const VALUE: string;
}
export default class Value {
  /**
   * @param {string} name
   * @param {number} [value=0]
   */
  constructor(name: string, value?: number | undefined);
  __id: number;
  name: string;
  value: number;
  /**
   * @param {string} eventName
   * @param {any} args
   */
  emit: (eventName: string, args: any) => void;
  /**
   * @param {string} eventName
   * @param {Function} fn
   */
  on: (eventName: string, fn: Function) => void;
  /**
   * @param {string} eventName
   * @param {Function} fn
   */
  off: (eventName: string, fn: Function) => void;
  /**
   * @param {number} value
   */
  to: (value: number) => Promise<any>;
}
