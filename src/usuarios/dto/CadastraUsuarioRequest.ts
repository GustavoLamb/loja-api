import {
  IsAlpha,
  IsEmail,
  IsInt,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CadastraUsuarioRequest {
  @IsAlpha('pt-BR', { message: 'Nome inválido ou não informado.' })
  @IsNotEmpty({ message: 'Nome inválido ou não informado.' })
  public nome: string;

  @IsEmail(undefined, { message: 'Email inválido ou não informado.' })
  public email: string;

  @IsInt({ message: 'Idade inválida ou não informada' })
  public idade: number;

  @MinLength(6, {
    message: 'Senha inválida ou não informada. Tamanho mínimo é 6 caracteres',
  })
  public senha: string;
}
