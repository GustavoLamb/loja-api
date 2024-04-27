import { Module } from '@nestjs/common';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { ProdutosController } from './produtos.controller';
import { ProdutosRepository } from './produtos.repository';
import { ProdutosSerivce } from './produtos.service';

@Module({
  imports: [UsuariosModule],
  controllers: [ProdutosController],
  providers: [ProdutosSerivce, ProdutosRepository],
})
export class ProdutosModule {}
