import { Navigation } from '../../../src/Navigation';

jest.unmock('@railsmob/events');

describe('Navigation', () => {
  describe('.wait', () => {
    it('should resolves when navigation is unlocked', async () => {
      const navigation = new Navigation();
      expect.assertions(2);
      expect(navigation.wait()).resolves.toBeUndefined();
      navigation.lock();
      const promise = navigation.wait();
      navigation.unlock();
      expect(promise).resolves.toBeUndefined();
    });
  });
});
