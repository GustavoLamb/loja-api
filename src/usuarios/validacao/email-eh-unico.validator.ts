import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UsuariosRepository } from '../usuarios.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  constructor(private repository: UsuariosRepository) {}

  public async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const usuarioExisteComEmail = await this.repository.existeComEmail(value);
    return !usuarioExisteComEmail;
  }
}

export const IsUniqueEmail = (opcoesValidacoes: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesValidacoes,
      constraints: [],
      validator: EmailEhUnicoValidator,
    });
  };
};
