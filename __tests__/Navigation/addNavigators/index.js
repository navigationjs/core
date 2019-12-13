import { Navigation } from '../../../src/Navigation';
import Base from '../../../src/Base';

describe('Navigation', () => {
  describe('.addNavigators', () => {
    it('should add navigators by their names', () => {
      const navigation = new Navigation();

      const first = new Base.Navigator('first');
      const second = new Base.Navigator('second');

      navigation.addNavigators(first, second);

      expect(navigation.navigators).toEqual({
        first,
        second,
      });
    });
  });
});
