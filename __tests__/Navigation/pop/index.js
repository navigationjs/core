import { Navigation } from '../../../src/Navigation';
import Base from '../../../src/Base';

jest.unmock('@railsmob/events');

describe('Navigation', () => {
  describe('.pop', () => {
    it('should remove last element in history', async () => {
      const navigation = new Navigation();
      const navigator = new Base.Navigator('navigator');
      navigator.addScenes(new Base.Scene('scene'));
      navigation.addNavigators(navigator);
      await navigation.go('navigator', 'scene');
      expect(navigation.history).toEqual(['navigator']);
      navigation.pop();
      expect(navigation.history).toEqual([]);
    });

    it('should emit id event', async () => {
      const navigation = new Navigation();
      const navigator1 = new Base.Navigator('navigator1');
      const navigator2 = new Base.Navigator('navigator2');
      navigator1.addScenes(new Base.Scene('scene'));
      navigator2.addScenes(new Base.Scene('scene'));
      navigation.addNavigators(navigator1, navigator2);

      await navigation.go('navigator1', 'scene');
      await navigation.go('navigator2', 'scene');

      const handler = jest.fn();
      navigation.on('id', handler);

      navigation.pop();
      expect(handler).toHaveBeenCalledWith({
        prev: 'navigator2/scene',
        id: 'navigator1/scene',
      });

      navigation.pop();
      expect(handler).toHaveBeenCalledWith({
        prev: 'navigator1/scene',
        id: undefined,
      });
    });
  });
});
