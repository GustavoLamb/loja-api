import { Body, Controller, Get, Post } from '@nestjs/common';
import { CadastraProdutoRequest } from './dto/CadastraProdutoRequest';
import { ProdutosRepository } from './produtos.repository';

@Controller('/produtos')
export class ProdutosController {
  constructor(private repository: ProdutosRepository) {}

  @Post()
  public async criarProduto(@Body() produtoRequest: CadastraProdutoRequest) {
    this.repository.salvar(produtoRequest);
  }

  @Get()
  public async listarProduto() {
    return this.repository.listarProdutos();
  }
}
