import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { EmailEhUnicoValidator } from './validacao/email-eh-unico.validator';
import { ExisteUsuarioByIdValidator } from './validacao/existe-usuario-id.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuariosController],
  providers: [UsuariosService, EmailEhUnicoValidator, ExisteUsuarioByIdValidator],
  exports: [ExisteUsuarioByIdValidator],
})
export class UsuariosModule {}
