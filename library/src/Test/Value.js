export default class Value {
  constructor(name, value = 0) {
    this.name = name;
    this.value = value;
  }

  to = value => {
    return new Promise(resolve => {
      this.value = value;
      resolve();
    });
  };
}
