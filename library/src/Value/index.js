import events from '@railsmob/events';

const defaultDuration = 0;
let id = 0;

export default class Value {
  static EVENTS = {
    WILL_VALUE: 'will_value',
    VALUE: 'value',
  };

  constructor(name, value = 0, duration = defaultDuration) {
    this.__id = ++id;
    this.name = name;
    this.value = value;
    this.duration = duration;
  }

  emit = (eventName, ...other) =>
    events.emit(`navigation_${eventName}:${this.__id}`, ...other);
  on = (eventName, ...other) =>
    events.on(`navigation_${eventName}:${this.__id}`, ...other);
  off = (eventName, ...other) =>
    events.off(`navigation_${eventName}:${this.__id}`, ...other);

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
