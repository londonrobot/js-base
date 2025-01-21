export class Contact {
  constructor(data) {
    this.type = data.type;
    this.value = data.value;
  }

  set() {
    this.type = data.type;
    this.value = data.value;
  }

  get() {
    return {
      type: this.type,
      value: this.value
    };
  }
}




