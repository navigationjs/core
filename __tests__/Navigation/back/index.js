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
      expect(navigation.history).toEqual([]);
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

    it('should remove navigator from history if navigator history is empty', async () => {
      const navigation = new Navigation();
      const navigator = new Base.Navigator('navigator');
      const scene1 = new Base.Scene('scene1');
      const scene2 = new Base.Scene('scene2');
      navigator.addScenes(scene1, scene2);
      navigation.addNavigators(navigator);
      await navigation.go('navigator', 'scene1');
      await navigation.go('navigator', 'scene2');
      expect(navigation.history).toEqual(['navigator']);
      await navigation.back();
      expect(navigation.history).toEqual(['navigator']);
      await navigation.back();
      expect(navigation.history).toEqual([]);
    });
  });
});
