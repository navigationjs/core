import { Navigation } from '../../../src/Navigation';
import Test from '../../../src/Test';

describe('Navigation', () => {
  describe('.addNavigators', () => {
    it('should add navigators by their names', () => {
      const navigation = new Navigation();

      const first = new Test.Navigator('first');
      const second = new Test.Navigator('second');

      navigation.addNavigators(first, second);

      expect(navigation.navigators).toEqual({
        first,
        second,
      });
    });
  });
});
