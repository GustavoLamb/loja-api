import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AtualizaProdutoRequest } from './dto/AtualizaProduto.request';
import { CadastraProdutoRequest } from './dto/CadastraProduto.request';
import { ProdutoResponse } from './dto/Produto.response';
import { ProdutoEntity } from './produto.entity';
import { ProdutosRepository } from './produtos.repository';

@Injectable()
export class ProdutosSerivce {
  constructor(private repository: ProdutosRepository) {}

  public async salvar(request: CadastraProdutoRequest): Promise<ProdutoResponse> {
    const produto = this.mapEntity(request);

    this.repository.salvar(produto);

    return new ProdutoResponse(
      produto.id,
      produto.nome,
      produto.valor,
      produto.usuarioId,
    );
  }

  public async atualizar(
    id: string,
    request: AtualizaProdutoRequest,
  ): Promise<ProdutoResponse> {
    return this.mapResponse(await this.repository.atualizar(id, request));
  }

  public async remover(id: string): Promise<ProdutoResponse> {
    return this.mapResponse(await this.repository.remover(id));
  }

  public async listar(): Promise<ProdutoResponse[]> {
    const produtos = await this.repository.listar();
    return produtos.map((produto) => this.mapResponse(produto));
  }

  private mapResponse(entity: ProdutoEntity) {
    return new ProdutoResponse(entity.id, entity.nome, entity.valor, entity.usuarioId);
  }

  private mapEntity(request: CadastraProdutoRequest) {
    const produto = new ProdutoEntity();

    produto.nome = request.nome;
    produto.valor = request.valor;
    produto.quantidadeDisponivel = request.quantidadeDisponivel;
    produto.descricao = request.descricao;
    produto.caracteristicas = request.caracteristicas;
    produto.imagens = request.imagens;
    produto.categoria = request.categoria;
    produto.usuarioId = request.usuarioId;
    produto.id = uuid();

    return produto;
  }
}
