import events from '@railsmob/events';

export const EVENTS = {
  WILL_VALUE: 'will_value',
  VALUE: 'value',
};

let id = 0;

export default class Value {
  /**
   * @param {string} name
   * @param {number} [value=0]
   * @param {number|undefined} [duration=0]
   */
  constructor(name, value = 0, duration = 0) {
    this.__id = ++id;
    this.name = name;
    this.value = value;
    this.duration = duration;
  }

  /**
   * @param {string} eventName
   * @param {any} args
   */
  emit = (eventName, args) =>
    events.emit(`navigation_${eventName}:${this.__id}`, args);
  /**
   * @param {string} eventName
   * @param {Function} fn
   */
  on = (eventName, fn) => events.on(`navigation_${eventName}:${this.__id}`, fn);
  /**
   * @param {string} eventName
   * @param {Function} fn
   */
  off = (eventName, fn) =>
    events.off(`navigation_${eventName}:${this.__id}`, fn);

  /**
   * @param {number} value
   */
  to = (value, duration = 0) => {
    const params = {
      __id: this.__id,
      name: this.name,
      duration,
      value,
    };

    this.emit(EVENTS.WILL_VALUE, params);
    return new Promise(resolve => {
      this.value = value;
      this.emit(EVENTS.VALUE, params);
      resolve();
    });
  };
}
