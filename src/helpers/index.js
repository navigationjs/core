const separator = '/';
/**
 * @param {string} navigator
 * @param {string} scene
 * @return {string}
 */
export const toId = (navigator, scene) => navigator + separator + scene;
/**
 * @param {string} id
 */
export const fromId = id => id.split(separator);
