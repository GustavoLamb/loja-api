import { Module } from '@nestjs/common';
import { ProdutosModule } from './produtos/produtos.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [UsuariosModule, ProdutosModule],
})
export class AppModule {}
