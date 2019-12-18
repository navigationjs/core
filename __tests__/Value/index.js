import events from '@railsmob/events';
import Value, { EVENTS } from '../../src/Value';

describe('Value', () => {
  it('should has a list of events', () => {
    expect(EVENTS).toEqual({
      WILL_VALUE: 'will_value',
      VALUE: 'value',
    });
  });

  describe('.constructor', () => {
    let id = 0;

    it('should create a new id', () => {
      const value = new Value();
      expect(value.__id).toBe(++id);
    });

    it('should increment id for every instance', () => {
      const value1 = new Value();
      expect(value1.__id).toBe(++id);
      const value2 = new Value();
      expect(value2.__id).toBe(++id);
    });

    it('should assign default value', () => {
      const value = new Value();
      expect(value.value).toBe(0);
    });

    it('should assign default duration', () => {
      const value = new Value();
      expect(value.duration).toBe(0);
    });

    it('should accept name, value and duration', () => {
      const value = new Value('active', 123, 456);
      expect(value.name).toBe('active');
      expect(value.value).toBe(123);
      expect(value.duration).toBe(456);
    });
  });

  describe('.emit', () => {
    it('should emit event with given name and __id', () => {
      const value = new Value();
      const params = { hello: 'world' };
      value.emit('will_value', params);
      expect(events.emit).toHaveBeenCalledTimes(1);
      expect(events.emit).toHaveBeenCalledWith(
        `navigation_will_value:${value.__id}`,
        params
      );
    });
  });

  describe('.on', () => {
    it('should subscribe on event with given name and __id', () => {
      const value = new Value();
      const callback = jest.fn();
      value.on('will_value', callback);
      expect(events.on).toHaveBeenCalledTimes(1);
      expect(events.on).toHaveBeenCalledWith(
        `navigation_will_value:${value.__id}`,
        callback
      );
    });
  });

  describe('.off', () => {
    it('should unsubscribe event from given name and __id', () => {
      const value = new Value();
      const callback = jest.fn();
      value.off('will_value', callback);
      expect(events.off).toHaveBeenCalledTimes(1);
      expect(events.off).toHaveBeenCalledWith(
        `navigation_will_value:${value.__id}`,
        callback
      );
    });
  });

  describe('.to', () => {
    it('should return a promise', () => {
      const value = new Value();
      expect(value.to().then).toBeDefined();
    });

    it('should emit will_value and value events', async () => {
      const value = new Value('active');
      value.emit = jest.fn();
      await value.to(123, 456);
      const params = {
        __id: value.__id,
        name: 'active',
        value: 123,
        duration: 456,
      };
      expect(value.emit).toHaveBeenCalledTimes(2);
      expect(value.emit).toHaveBeenCalledWith('will_value', params);
      expect(value.emit).toHaveBeenCalledWith('value', params);
    });

    it('should change value', () => {
      const value = new Value();
      value.to(123);
      expect(value.value).toBe(123);
    });
  });
});
