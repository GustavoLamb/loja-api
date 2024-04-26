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
export class ExisteUsuarioByIdValidator
  implements ValidatorConstraintInterface
{
  constructor(private repository: UsuariosRepository) {}

  public async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const usuarioExisteComId = await this.repository.existeComId(value);
    return usuarioExisteComId;
  }
}

export const ExistUserById = (opcoesValidacoes: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesValidacoes,
      constraints: [],
      validator: ExisteUsuarioByIdValidator,
    });
  };
};
