import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutosRepository {
  private produtosList: Array<ProdutoEntity> = [];

  public async salvar(produto: ProdutoEntity): Promise<ProdutoEntity> {
    this.produtosList.push(produto);
    return produto;
  }

  public async atualizar(
    id: string,
    dados: Partial<ProdutoEntity>,
  ): Promise<ProdutoEntity> {
    const produto = this.consultarPorId(id);

    Object.entries(dados).forEach(([chave, valor]) => {
      if (chave == 'id') {
        return;
      }

      produto[chave] = valor;
    });

    return produto;
  }

  public async remover(id: string): Promise<ProdutoEntity> {
    const produto = this.consultarPorId(id);

    this.produtosList = this.produtosList.filter(
      (produtoSalvo) => produtoSalvo.id != produto.id,
    );

    return produto;
  }

  public async listar(): Promise<ProdutoEntity[]> {
    return this.produtosList;
  }

  public consultarPorId(id: string): ProdutoEntity {
    const possivelProduto = this.produtosList.find((produto) => produto.id === id);

    if (!possivelProduto) {
      throw Error('Produto não encontrado!');
    }

    return possivelProduto;
  }
}
