import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Produto } from './domain/Produto';

@Injectable()
export class ProdutosRepository {
  private produtosList: Array<Produto> = [];

  public async salvar(newProduto): Promise<Produto> {
    const produto: Produto = { id: uuid(), ...newProduto };
    this.produtosList.push(produto);
    return produto;
  }

  public async listarProdutos(): Promise<Produto[]> {
    return this.produtosList;
  }
}
