export default {
  id: (name, id) => name + ':' + id,
  emit: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
}