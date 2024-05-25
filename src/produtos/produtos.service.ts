import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UsuarioEntity } from 'src/usuarios/usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoRequest } from './dto/AtualizaProduto.request';
import { CadastraProdutoRequest } from './dto/CadastraProduto.request';
import { ProdutoResponse } from './dto/Produto.response';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutosSerivce {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  public async listar(): Promise<ProdutoResponse[]> {
    const produtos = await this.produtoRepository.find();

    return produtos.map((produto) => this.mapResponse(produto));
  }

  public async consultar(id: string): Promise<ProdutoResponse> {
    return this.mapResponse(await this.consultarPorId(id));
  }

  public async salvar(request: CadastraProdutoRequest): Promise<ProdutoResponse> {
    const produto = plainToClass(ProdutoEntity, request);
    produto.usuario = { id: request.usuarioId } as UsuarioEntity;

    this.produtoRepository.save(produto);

    return this.mapResponse(produto);
  }

  public async atualizar(
    id: string,
    request: AtualizaProdutoRequest,
  ): Promise<ProdutoResponse> {
    await this.produtoRepository.update(id, request);
    return this.consultar(id);
  }

  public async remover(id: string): Promise<ProdutoResponse> {
    const produto = await this.consultarPorId(id);

    this.produtoRepository.delete(id);

    return this.mapResponse(produto);
  }

  private async consultarPorId(id: string): Promise<ProdutoEntity> {
    const possivelProduto = await this.produtoRepository.findOneBy({ id: id });

    if (!possivelProduto) {
      throw new Error('Produto não encontrado');
    }

    return possivelProduto;
  }

  private mapResponse(entity: ProdutoEntity) {
    return plainToInstance(ProdutoResponse, entity, { excludeExtraneousValues: true });
  }
}
