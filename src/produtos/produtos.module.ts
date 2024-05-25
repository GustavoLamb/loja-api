import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { ProdutoEntity } from './produto.entity';
import { ProdutosController } from './produtos.controller';
import { ProdutosSerivce } from './produtos.service';

@Module({
  imports: [UsuariosModule, TypeOrmModule.forFeature([ProdutoEntity])],
  controllers: [ProdutosController],
  providers: [ProdutosSerivce],
})
export class ProdutosModule {}
