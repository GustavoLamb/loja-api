import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class AtualizaProdutoRequest {
  @IsOptional()
  @Matches(/^[a-zA-Z ]*$/, { message: 'Nome inválido ou não informado.' })
  @IsNotEmpty({ message: 'Nome inválido ou não informado' })
  public nome: string;

  @IsOptional()
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

  @IsOptional()
  @IsInt({
    message: 'Quantidade disponível inválida. Valor precisa ser inteiro',
  })
  @Min(0, {
    message: 'Quantidade disponível inválida. Valor precisa ser no mínimo 0',
  })
  public quantidadeDisponivel: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Descrição inválida ou não informado' })
  @MaxLength(1000, {
    message: 'Descrição inválida. Tamanho máximo da descrição é 1000',
  })
  public descricao: string;

  @IsOptional()
  @IsArray({ message: 'Caracteristicas do produto inválida ou não informada' })
  @ArrayMinSize(3, {
    message: 'Caracteristicas inválidas. Lista precisa ter no mínimo 3 valores',
  })
  @ValidateNested({ each: true })
  @Type(() => CaracteristicasProdutoRequest)
  public caracteristicas: CaracteristicasProdutoRequest[];

  @IsOptional()
  @IsArray({ message: 'Imagens do produto inválida ou não informada' })
  @ArrayMinSize(1, {
    message: 'Imagens inválidas. Lista precisa ter no mínimo 1 valor',
  })
  @ValidateNested({ each: true })
  @Type(() => ImagensProdutoRequest)
  public imagens: ImagensProdutoRequest[];

  @IsOptional()
  @IsString({ message: 'Categoria inválida ou não informada' })
  @IsNotEmpty({ message: 'Categoria inválida ou não informada' })
  public categoria: string;
}

class CaracteristicasProdutoRequest {
  @IsOptional()
  @IsString({ message: 'Nome da característica inválido ou não informado' })
  @IsNotEmpty({ message: 'Nome da característica inválido ou não informado' })
  public nome: string;

  @IsOptional()
  @IsString({
    message: 'Descrição da característica inválido ou não informado',
  })
  @IsNotEmpty({
    message: 'Descrição da característica inválido ou não informado',
  })
  public descricao: string;
}

class ImagensProdutoRequest {
  @IsOptional()
  @IsString({ message: 'Url da imagem inválido ou não informado' })
  @IsNotEmpty({ message: 'Url da imagem inválido ou não informado' })
  public url: string;

  @IsOptional()
  @IsString({ message: 'Descrição da imagem inválido ou não informado' })
  @IsNotEmpty({ message: 'Descrição da imagem inválido ou não informado' })
  public descricao: string;
}
