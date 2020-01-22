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
import Value from "../Value";
