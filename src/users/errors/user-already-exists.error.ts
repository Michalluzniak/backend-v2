import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistsError extends ConflictException {
  constructor(field: 'username' | 'email') {
    super(`User with given ${field} already exists`);
  }
}
