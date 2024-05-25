import { Expose, Transform, Type } from 'class-transformer';

export class ProdutoResponse {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly nome: string;

  @Expose()
  @Type(() => Number)
  public readonly valor: number;

  @Expose()
  public readonly quantidadeEstoque: number;

  @Expose()
  public readonly categoria: string;

  @Expose()
  @Transform(({ obj, key }) => obj[key].nome)
  public readonly usuario: string;

  @Expose()
  @Type(() => CaracteristicaResponse)
  public readonly caracteristicas: CaracteristicaResponse[];

  @Expose()
  @Type(() => ImagemResponse)
  public readonly imagens: ImagemResponse[];
}

class CaracteristicaResponse {
  @Expose()
  public readonly nome: string;

  @Expose()
  public readonly descricao: string;
}

class ImagemResponse {
  @Expose()
  public readonly url: string;

  @Expose()
  public readonly descricao: string;
}
