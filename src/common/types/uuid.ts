import { v4 as uuidv4 } from 'uuid';

export class UUID {
  private readonly value: string;

  constructor() {
    this.value = uuidv4();
  }

  toString() {
    return this.value;
  }

  toJSON() {
    return this.value;
  }
}
