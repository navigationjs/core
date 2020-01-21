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
  });
});
