declare module 'src/helpers/index' {
  export function toId(navigator: string, scene: string): string;
  export function fromId(id: string): string[];
}
declare module 'src/Value/index' {
  export default class Value {
    static EVENTS: {
      WILL_VALUE: string;
      VALUE: string;
    };
    /**
     * @param {string} name
     * @param {number} [value=0]
     * @param {number} [duration=0]
     */
    constructor(
      name: string,
      value?: number | undefined,
      duration?: number | undefined
    );
    __id: number;
    name: string;
    value: number;
    duration: number;
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
     * @param {number} [duration=0]
     */
    to: (value: number, duration?: number | undefined) => Promise<any>;
  }
}
declare module 'src/Base/Scene' {
  export default class Scene {
    /**
     * @param {string} name
     */
    constructor(name: string);
    /**
     * @property {string} name
     */
    name: string;
    active: Value;
    /**
     * @param {number} duration
     */
    show: (duration: number) => Promise<any>;
    /**
     * @param {number} duration
     */
    hide: (duration: number) => Promise<any>;
  }
  import Value from 'src/Value';
}
declare module 'src/Base/Navigator' {
  /**
   * @typedef { import("./Scene").default } Scene
   */
  export default class Navigator {
    /**
     * @param {string} name
     */
    constructor(name: string);
    name: string;
    /**
     * @type {{[key: string]: Scene}}
     */
    scenes: {
      [key: string]: Scene;
    };
    /**
     * @type {Array<string>}
     */
    history: Array<string>;
    /**
     * @param {...Scene} scenes
     */
    addScenes: (...scenes: import('src/Base/Scene').default[]) => void;
    current: () => string;
    /**
     * @param {string} name
     * @param {number} duration
     */
    go: (name: string, duration: number) => Promise<void>;
    /**
     * @param {number} duration
     */
    back: (duration: number) => Promise<void>;
    reset: () => Promise<void>;
  }
  export type Scene = import('src/Base/Scene').default;
}
declare module 'src/Navigation/index' {
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
    addNavigators: (
      ...navigators: import('src/Base/Navigator').default[]
    ) => void;
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
  var _default: Navigation;
  export default _default;
  export type Navigator = import('src/Base/Navigator').default;
}
declare module 'src/Base/index' {
  namespace _default {
    export { Navigator };
    export { Scene };
  }
  export default _default;
  import Navigator from 'src/Base/Navigator';
  import Scene from 'src/Base/Scene';
}
declare module '@navigationjs/core' {
  export default navigation;
  import { Navigation } from 'src/Navigation';
  import Base from 'src/Base';
  import Value from 'src/Value';
  import { toId } from 'src/helpers';
  import { fromId } from 'src/helpers';
  import navigation from 'src/Navigation';
  export { Navigation, Base, Value, toId, fromId };
}
