import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AtualizaProdutoRequest } from './dto/AtualizaProduto.request';
import { CadastraProdutoRequest } from './dto/CadastraProduto.request';
import { ProdutoResponse } from './dto/Produto.response';
import { ProdutosSerivce } from './produtos.service';

@Controller('/produtos')
export class ProdutosController {
  constructor(private service: ProdutosSerivce) {}

  @Get()
  public async listarProduto(): Promise<ProdutoResponse[]> {
    return this.service.listar();
  }

  @Post()
  public async cadastrarProduto(
    @Body() request: CadastraProdutoRequest,
  ): Promise<ProdutoResponse> {
    return this.service.salvar(request);
  }

  @Patch(':id')
  public async atualizarProduto(
    @Param('id') id: string,
    @Body() request: AtualizaProdutoRequest,
  ): Promise<ProdutoResponse> {
    return this.service.atualizar(id, request);
  }

  @Delete(':id')
  public async removerProduto(@Param('id') id: string): Promise<ProdutoResponse> {
    return this.service.remover(id);
  }
}
