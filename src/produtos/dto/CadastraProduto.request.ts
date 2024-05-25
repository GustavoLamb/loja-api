import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ExistUserById } from 'src/usuarios/validacao/existe-usuario-id.validator';

export class CadastraProdutoRequest {
  @Matches(/^[a-zA-Z ]*$/, { message: 'Nome inválido ou não informado.' })
  @IsNotEmpty({ message: 'Nome inválido ou não informado' })
  public nome: string;

  @IsPositive({
    message: 'Valor do produto inválido. Valor precisa ser positivo',
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'Valor do produto inválido. Valor precisa ter 2 casas decimais',
    },
  )
  public valor: number;

  @IsInt({
    message: 'Quantidade no estoque inválida. Valor precisa ser inteiro',
  })
  @Min(0, {
    message: 'Quantidade no estoque inválida. Valor precisa ser no mínimo 0',
  })
  public quantidadeEstoque: number;

  @IsNotEmpty({ message: 'Descrição inválida ou não informado' })
  @MaxLength(1000, {
    message: 'Descrição inválida. Tamanho máximo da descrição é 1000',
  })
  public descricao: string;

  @IsArray({ message: 'Caracteristicas do produto inválida ou não informada' })
  @ArrayMinSize(3, {
    message: 'Caracteristicas inválidas. Lista precisa ter no mínimo 3 valores',
  })
  @ValidateNested({ each: true })
  @Type(() => CaracteristicasProdutoRequest)
  public caracteristicas: CaracteristicasProdutoRequest[];

  @IsArray({ message: 'Imagens do produto inválida ou não informada' })
  @ArrayMinSize(1, {
    message: 'Imagens inválidas. Lista precisa ter no mínimo 1 valor',
  })
  @ValidateNested({ each: true })
  @Type(() => ImagensProdutoRequest)
  public imagens: ImagensProdutoRequest[];

  @IsString({ message: 'Categoria inválida ou não informada' })
  @IsNotEmpty({ message: 'Categoria inválida ou não informada' })
  public categoria: string;

  @IsUUID('all', { message: 'ID do usuário inválido. UUID inválido.' })
  @IsNotEmpty({ message: 'ID do usuário inválido ou não informado.' })
  @ExistUserById({ message: 'ID do usuário inválido. Usuário não existe.' })
  public usuarioId: string;
}

class CaracteristicasProdutoRequest {
  @IsString({ message: 'Nome da característica inválido ou não informado' })
  @IsNotEmpty({ message: 'Nome da característica inválido ou não informado' })
  public nome: string;

  @IsString({
    message: 'Descrição da característica inválido ou não informado',
  })
  @IsNotEmpty({
    message: 'Descrição da característica inválido ou não informado',
  })
  public descricao: string;
}

class ImagensProdutoRequest {
  @IsString({ message: 'Url da imagem inválido ou não informado' })
  @IsNotEmpty({ message: 'Url da imagem inválido ou não informado' })
  public url: string;

  @IsString({ message: 'Descrição da imagem inválido ou não informado' })
  @IsNotEmpty({ message: 'Descrição da imagem inválido ou não informado' })
  public descricao: string;
}
