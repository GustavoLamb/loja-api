import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsAlpha,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CadastraProdutoRequest {
  @IsAlpha('pt-BR', { message: 'Nome inválido ou não informado.' })
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
    message: 'Quantidade disponível inválida. Valor precisa ser inteiro',
  })
  @Min(0, {
    message: 'Quantidade disponível inválida. Valor precisa ser no mínimo 0',
  })
  public quantidadeDisponivel: number;

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
  @Type(() => CaracteristicasProduto)
  public caracteristicas: CaracteristicasProduto[];

  @IsArray({ message: 'Imagens do produto inválida ou não informada' })
  @ArrayMinSize(1, {
    message: 'Imagens inválidas. Lista precisa ter no mínimo 1 valor',
  })
  @ValidateNested({ each: true })
  @Type(() => ImagensProduto)
  public imagens: ImagensProduto[];

  @IsString({ message: 'Categoria inválida ou não informada' })
  @IsNotEmpty({ message: 'Categoria inválida ou não informada' })
  public categoria: string;
}

class CaracteristicasProduto {
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

class ImagensProduto {
  @IsString({ message: 'Url da imagem inválido ou não informado' })
  @IsNotEmpty({ message: 'Url da imagem inválido ou não informado' })
  public url: string;

  @IsString({ message: 'Descrição da imagem inválido ou não informado' })
  @IsNotEmpty({ message: 'Descrição da imagem inválido ou não informado' })
  public descricao: string;
}
