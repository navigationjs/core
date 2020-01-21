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
      WILL_CHANGE: 'will_change',
      CHANGE: 'change',
      WILL_BLUR: 'will_blur',
      BLUR: 'blur',
      WILL_FOCUS: 'will_focus',
      FOCUS: 'focus',
    });
  });
});
