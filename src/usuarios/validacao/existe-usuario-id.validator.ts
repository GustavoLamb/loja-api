import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario.entity';

@Injectable()
@ValidatorConstraint({ async: true })
export class ExisteUsuarioByIdValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly repository: Repository<UsuarioEntity>,
  ) {}

  public async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const usuarioExisteComId = await this.repository.existsBy({ id: value });
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
