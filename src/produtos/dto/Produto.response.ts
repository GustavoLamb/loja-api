export class ProdutoResponse {
  constructor(
    readonly id: string,
    readonly nome: string,
    readonly valor: number,
    readonly usuarioId: string,
  ) {}
}
