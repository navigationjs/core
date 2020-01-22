import { Navigation } from '../../../src/Navigation';
import Base from '../../../src/Base';

describe('Navigation', () => {
  describe('.back', () => {
    it('should resolve immediately if navigation is locked', () => {
      const navigation = new Navigation();
      navigation.locked = true;
      expect(navigation.back()).resolves.toBeUndefined();
    });

    it('should lock navigation immediately and unlock at the end', async () => {
      const navigation = new Navigation();
      const navigator = new Base.Navigator('navigator');
      const scene = new Base.Scene('scene');
      navigator.addScenes(scene);
      navigation.addNavigators(navigator);
      await navigation.go('navigator', 'scene');
      expect(navigation.locked).toBeFalsy();
      const promise = navigation.back();
      expect(navigation.locked).toBeTruthy();
      await promise;
      expect(navigation.locked).toBeFalsy();
    });

    it('should resolve if history is empty', async () => {
      const navigation = new Navigation();
      const navigator = new Base.Navigator('navigator');
      navigation.addNavigators(navigator);
      expect.assertions(1);
      expect(navigation.history.isEmpty()).toBeTruthy();
      try {
        await navigation.back();
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it('should call back on the navigator', async () => {
      const navigation = new Navigation();
      const navigator = new Base.Navigator('navigator');
      const scene = new Base.Scene('scene');
      navigator.addScenes(scene);
      navigation.addNavigators(navigator);
      await navigation.go('navigator', 'scene');
      navigator.back = jest.fn();
      await navigation.back();
      expect(navigator.back).toHaveBeenCalledTimes(1);
    });
  });
});
