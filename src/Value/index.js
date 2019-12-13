import events from '@railsmob/events';

const defaultDuration = 0;
let id = 0;

export default class Value {
  static EVENTS = {
    WILL_VALUE: 'will_value',
    VALUE: 'value',
  };

  /**
   * @param {string} name
   * @param {number} [value=0]
   * @param {number} [duration=0]
   */
  constructor(name, value = 0, duration = defaultDuration) {
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
   * @param {number} [duration=0]
   */
  to = (value, duration = this.duration) => {
    const params = {
      __id: this.__id,
      name: this.name,
      value,
      duration,
    };

    this.emit(Value.EVENTS.WILL_VALUE, params);
    return new Promise(resolve => {
      this.value = value;
      this.emit(Value.EVENTS.VALUE, params);
      resolve();
    });
  };
}
