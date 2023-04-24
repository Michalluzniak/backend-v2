import { ConflictException } from '@nestjs/common';
export declare class UserAlreadyExistsError extends ConflictException {
    constructor(field: 'username' | 'email');
}
