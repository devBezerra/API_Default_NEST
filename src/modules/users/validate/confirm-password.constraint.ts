/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { CreateUserDto } from '../dto/create-user.dto';

@ValidatorConstraint({ name: 'ConfirmPassword' })
export class ConfirmPassword implements ValidatorConstraintInterface {
  async validate(description: string, validationArguments: ValidationArguments): Promise<boolean> {
    const user: CreateUserDto = Object.assign(validationArguments.object);
    if (user.password !== user.confirmPassword) {
      return !user;
    }
    return !!user;
  }
}
