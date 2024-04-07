import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutosRepository {
  private produtosList = [];

  public async salvar(produto) {
    this.produtosList.push(produto);
  }

  public async listarProdutos() {
    return this.produtosList;
  }
}
