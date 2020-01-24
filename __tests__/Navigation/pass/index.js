import { Navigation } from '../../../src/Navigation';
import Base from '../../../src/Base';

jest.unmock('@railsmob/events');

describe('Navigation', () => {
  describe('.pass', () => {
    it('should push navigatorName on id', async () => {
      const navigation = new Navigation();
      const navigator1 = new Base.Navigator('navigator1');
      const navigator2 = new Base.Navigator('navigator2');
      navigator1.addScenes(new Base.Scene('scene'));
      navigator2.addScenes(new Base.Scene('scene'));
      await navigator2.go('scene');
      navigation.addNavigators(navigator1, navigator2);
      expect(navigation.history.chain).toEqual([]);
      const handler = jest.fn();
      navigation.on('id:navigator2/scene', handler);
      navigation.pass('navigator1/scene', 'navigator2');
      await navigation.go('navigator1', 'scene');
      expect(navigation.history.chain).toEqual(['navigator1', 'navigator2']);
      expect(handler).toHaveBeenCalledWith({
        prev: 'navigator1/scene',
        id: 'navigator2/scene',
      });
    });
  });
});
