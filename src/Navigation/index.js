import events from '@railsmob/events';
import { toId } from '../helpers';

export const EVENTS = {
  LOCK: 'lock',
  UNLOCK: 'unlock',
  WILL_BLUR: 'will_blur',
  BLUR: 'blur',
  WILL_FOCUS: 'will_focus',
  FOCUS: 'focus',
};

/**
 * @typedef {import("../Base/Navigator").default} Navigator
 */

export class Navigation {
  /**
   * @type {{ [name: string]: Navigator }}
   */
  navigators = {};
  /**
   * @type {Array<string>}
   */
  history = [];
  locked = false;
  lockCounter = 0;

  /**
   * @param {string} eventId
   * @param {Function} fn
   */
  on = (eventId, fn) => events.on(`navigation_${eventId}`, fn);
  /**
   * @param {string} eventId
   * @param {Function} fn
   */
  once = (eventId, fn) => events.once(`navigation_${eventId}`, fn);
  /**
   * @param {string} eventId
   * @param {Function} fn
   */
  off = (eventId, fn) => events.off(`navigation_${eventId}`, fn);
  /**
   * @param {string} eventId
   * @param {any} [args]
   */
  emit = (eventId, args) => events.emit(`navigation_${eventId}`, args);

  /**
   * @param {...Navigator} navigators
   */
  addNavigators = (...navigators) =>
    navigators.forEach(it => (this.navigators[it.name] = it));

  lock = () => {
    this.locked = true;
    this.lockCounter++;
    this.emit(EVENTS.LOCK);
  };

  unlock = () => {
    this.lockCounter--;
    if (this.lockCounter === 0) {
      this.locked = false;
      this.emit(EVENTS.UNLOCK);
    }
  };

  wait = () => {
    if (!this.locked) return Promise.resolve();
    return new Promise(resolve => {
      this.once(EVENTS.UNLOCK, () => resolve());
    });
  };

  /**
   * @param {string} navigatorName
   * @param {string} sceneName
   * @param {number} duration
   */
  go = async (navigatorName, sceneName, duration) => {
    if (this.locked) return Promise.resolve();

    this.lock();

    const prevId = this.id();
    const nextId = toId(navigatorName, sceneName);

    const navigator = this.navigators[navigatorName];
    if (!navigator) return Promise.reject();

    if (prevId !== nextId) {
      if (prevId) {
        this.emit(events.id(EVENTS.WILL_BLUR, prevId), {
          id: prevId,
        });
      }
      this.emit(events.id(EVENTS.WILL_FOCUS, nextId), {
        id: nextId,
      });
    }

    if (sceneName) await navigator.go(sceneName, duration);
    this.push(navigatorName);

    if (prevId !== nextId) {
      if (prevId) {
        this.emit(events.id(EVENTS.BLUR, prevId), {
          id: prevId,
        });
      }
      this.emit(events.id(EVENTS.FOCUS, nextId), {
        id: nextId,
      });
    }

    this.unlock();

    return Promise.resolve();
  };

  /**
   * @param {string} navigatorName
   */
  push = navigatorName => {
    const navigator = this.navigators[navigatorName];
    if (!navigator) throw null;

    const index = this.history.findIndex(it => it === navigatorName);
    if (index >= 0) this.history.splice(index, 1);
    this.history.push(navigatorName);
  };

  pop = () => {
    return this.history.pop();
  };

  /**
   * @param {number} duration
   */
  back = async duration => {
    if (this.locked) return Promise.resolve();

    this.lock();

    const navigator = this.navigators[this.current()];
    if (!navigator) return Promise.resolve();

    const prevId = this.id();

    if (prevId) {
      this.emit(events.id(EVENTS.WILL_BLUR, prevId), {
        id: prevId,
      });
    }

    const navigatorWillChange = navigator.history.length <= 1;

    const nextNavigator = navigatorWillChange
      ? this.navigators[this.history[this.history.length - 2]]
      : navigator;

    const nextId = nextNavigator
      ? toId(
          nextNavigator.name,
          nextNavigator.history[
            nextNavigator.history.length - (navigatorWillChange ? 1 : 2)
          ]
        )
      : null;

    if (nextId) {
      this.emit(events.id(EVENTS.WILL_FOCUS, nextId), {
        id: nextId,
      });
    }

    await navigator.back(duration);
    if (navigator.history.length === 0) this.history.pop();

    if (prevId) {
      this.emit(events.id(EVENTS.BLUR, prevId), {
        id: prevId,
      });
    }

    if (nextId) {
      this.emit(events.id(EVENTS.FOCUS, nextId), {
        id: nextId,
      });
    }

    this.unlock();

    return Promise.resolve();
  };

  reset = () => {
    this.history = [];
    return Promise.all(
      Object.keys(this.navigators).map(name => this.navigators[name].reset())
    );
  };

  current = () => this.history[this.history.length - 1];

  id = () => {
    const currentNavigator = this.current();
    if (!currentNavigator) return;
    const currentScene = this.navigators[currentNavigator].current();
    if (!currentScene) return;
    return toId(currentNavigator, currentScene);
  };
}

export default new Navigation();
