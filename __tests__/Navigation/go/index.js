import { Navigation } from '../../../src/Navigation';
import Base from '../../../src/Base';

describe('Navigation', () => {
  describe('.go', () => {
    it('should resolve immediately if navigation is locked', () => {
      const navigation = new Navigation();
      navigation.locked = true;
      expect(navigation.go()).resolves.toBeUndefined();
    });

    it('should lock navigation immediately and unlock at the end', async () => {
      const navigation = new Navigation();
      const navigator = new Base.Navigator('navigator');
      const scene = new Base.Scene('scene');
      navigator.addScenes(scene);
      navigation.addNavigators(navigator);

      expect(navigation.locked).toBeFalsy();
      const promise = navigation.go('navigator', 'scene');
      expect(navigation.locked).toBeTruthy();
      await promise;
      expect(navigation.locked).toBeFalsy();
    });

    it('should reject if there is no such navigator', async () => {
      expect.assertions(1);
      try {
        const navigation = new Navigation();
        await navigation.go('anything', 'scene');
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('should call history push', async () => {
      const navigation = new Navigation();
      const navigator = new Base.Navigator('navigator');
      const scene = new Base.Scene('scene');
      navigator.addScenes(scene);
      navigation.addNavigators(navigator);
      navigation.history.push = jest.fn();
      await navigation.go('navigator', 'scene');
      expect(navigation.history.push).toHaveBeenCalledWith('navigator');
    });

    it('should run go on the navigator', async () => {
      const navigation = new Navigation();
      const navigator = new Base.Navigator('navigator');
      const scene = new Base.Scene('scene');
      navigator.addScenes(scene);
      navigation.addNavigators(navigator);
      navigator.go = jest.fn();
      await navigation.go('navigator', 'scene');
      expect(navigator.go).toHaveBeenCalledTimes(1);
    });

    it('should push navigator to history after go is completed', async () => {
      const navigation = new Navigation();
      const navigator = new Base.Navigator('navigator');
      const scene = new Base.Scene('scene');
      navigator.addScenes(scene);
      navigation.addNavigators(navigator);
      const promise = navigation.go('navigator', 'scene');
      expect(navigation.history.isEmpty()).toBeTruthy();
      await promise;
      expect(navigation.history.chain).toEqual(['navigator']);
    });
  });
});
