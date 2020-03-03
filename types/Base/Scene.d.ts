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
  show: () => Promise<any>;
  hide: () => Promise<any>;
}
import Value from '../Value';
