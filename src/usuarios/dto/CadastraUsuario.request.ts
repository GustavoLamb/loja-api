import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';
import { IsUniqueEmail } from '../validacao/email-eh-unico.validator';

export class CadastraUsuarioRequest {
  @Matches(/^[a-zA-Z ]*$/, { message: 'Nome inválido ou não informado.' })
  @IsNotEmpty({ message: 'Nome inválido ou não informado.' })
  public nome: string;

  @IsEmail(undefined, { message: 'Email inválido ou não informado.' })
  @IsUniqueEmail({ message: 'Email inválido. Já cadastrado.' })
  public email: string;

  @IsInt({ message: 'Idade inválida ou não informada' })
  public idade: number;

  @MinLength(6, {
    message: 'Senha inválida ou não informada. Tamanho mínimo é 6 caracteres',
  })
  public senha: string;
}
