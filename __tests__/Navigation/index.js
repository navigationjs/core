import { Navigation, EVENTS } from '../../src/Navigation';

describe('navigation', () => {
  it('should has a navigators as an empty object', () => {
    const navigation = new Navigation();
    expect(navigation.navigators).toEqual({});
  });

  it('should has EVENTS list', () => {
    expect(EVENTS).toEqual({
      LOCK: 'lock',
      UNLOCK: 'unlock',
      ID: 'id',
    });
  });
});
