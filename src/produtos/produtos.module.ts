import { Module } from '@nestjs/common';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { ProdutosController } from './produtos.controller';
import { ProdutosRepository } from './produtos.repository';

@Module({
  imports: [UsuariosModule],
  controllers: [ProdutosController],
  providers: [ProdutosRepository],
})
export class ProdutosModule {}
