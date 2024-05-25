import { Expose } from 'class-transformer';

export class UsuarioResponse {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly nome: string;

  @Expose()
  public readonly idade: number;
}
