import { Navigation } from '../../../src/Navigation';
import Base from '../../../src/Base';

jest.unmock('@railsmob/events');

describe('Navigation', () => {
  describe('.push', () => {
    it('should reject if no such navigator', () => {
      expect.assertions(1);
      try {
        const navigation = new Navigation();
        navigation.push('anything', 'scene');
      } catch (e) {
        expect(e).toBeNull();
      }
    });
    it('should add navigator to the end', () => {
      const navigation = new Navigation();
      const navigator1 = new Base.Navigator('navigator1');
      const navigator2 = new Base.Navigator('navigator2');
      navigation.addNavigators(navigator1, navigator2);
      navigation.push('navigator1');
      expect(navigation.history).toEqual(['navigator1']);
      navigation.push('navigator2');
      expect(navigation.history).toEqual(['navigator1', 'navigator2']);
    });

    it('should remove navigator from history if it was included', () => {
      const navigation = new Navigation();
      const navigator1 = new Base.Navigator('navigator1');
      const navigator2 = new Base.Navigator('navigator2');
      navigation.addNavigators(navigator1, navigator2);
      navigation.push('navigator1');
      navigation.push('navigator2');
      navigation.push('navigator1');
      expect(navigation.history).toEqual(['navigator2', 'navigator1']);
    });

    it('should emit id event', async () => {
      const navigation = new Navigation();
      const navigator1 = new Base.Navigator('navigator1');
      const navigator2 = new Base.Navigator('navigator2');
      navigator1.addScenes(new Base.Scene('scene'));
      await navigator1.go('scene');
      navigator2.addScenes(new Base.Scene('scene'));
      await navigator2.go('scene');
      navigation.addNavigators(navigator1, navigator2);

      const handler = jest.fn();
      navigation.on('id', handler);

      navigation.push('navigator1');
      expect(handler).toHaveBeenCalledWith({
        prev: undefined,
        id: 'navigator1/scene',
      });

      navigation.push('navigator2');
      expect(handler).toHaveBeenCalledWith({
        prev: 'navigator1/scene',
        id: 'navigator2/scene',
      });
    });
  });
});
