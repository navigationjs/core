import events from '@railsmob/events';

export const EVENTS = {
  CHANGE: 'change',
};

export default class History {
  /**
   * @param {string} name
   */
  constructor(name) {
    /**
     * @property {string} name
     */
    this.name = name;
    /**
     * @type {Array<string>}
     */
    this.chain = [];
  }

  /**
   * @param {string} eventId
   * @param {Function} fn
   */
  on = (eventId, fn) => events.on(`history_${eventId}`, fn);
  /**
   * @param {string} eventId
   * @param {Function} fn
   */
  once = (eventId, fn) => events.once(`history_${eventId}`, fn);
  /**
   * @param {string} eventId
   * @param {Function} fn
   */
  off = (eventId, fn) => events.off(`history_${eventId}`, fn);
  /**
   * @param {string} eventId
   * @param {any} [args]
   */
  emit = (eventId, args) => events.emit(`history_${eventId}`, args);

  current = () => this.chain[this.chain.length - 1];

  isEmpty = () => this.chain.length === 0;

  /**
   * @param {string} name
   */
  push = name => {
    const index = this.chain.findIndex(it => it === name);
    const prev = this.current();
    if (index >= 0) this.chain.splice(index, 1);
    this.chain.push(name);
    const next = this.current();
    if (prev !== next) {
      this.emit(events.id(EVENTS.CHANGE, this.name), { prev, next });
    }
  };

  pop = () => {
    const prev = this.current();
    this.chain.pop();
    const next = this.current();
    if (prev !== next) {
      this.emit(events.id(EVENTS.CHANGE, this.name), { prev, next });
    }
  };
}
