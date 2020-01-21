export namespace EVENTS {
    export const WILL_VALUE: string;
    export const VALUE: string;
}
export default class Value {
    /**
     * @param {string} name
     * @param {number} [value=0]
     * @param {number} [duration=0]
     */
    constructor(name: string, value?: number | undefined, duration?: number | undefined);
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
