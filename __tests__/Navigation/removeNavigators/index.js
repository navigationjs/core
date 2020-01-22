import { Navigation } from '../../../src/Navigation';
import Base from '../../../src/Base';

describe('Navigation', () => {
  describe('.removeNavigators', () => {
    it('should remove navigators by their names', () => {
      const navigation = new Navigation();

      const first = new Base.Navigator('first');
      const second = new Base.Navigator('second');
      const third = new Base.Navigator('third');

      navigation.addNavigators(first, second, third);

      expect(navigation.navigators).toEqual({
        first,
        second,
        third,
      });

      navigation.removeNavigators('first');
      expect(navigation.navigators).toEqual({
        second,
        third,
      });

      navigation.removeNavigators('third', 'second');
      expect(navigation.navigators).toEqual({});
    });
  });
});
