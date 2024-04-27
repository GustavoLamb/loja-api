import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosRepository } from './usuarios.repository';
import { UsuariosService } from './usuarios.service';
import { EmailEhUnicoValidator } from './validacao/email-eh-unico.validator';
import { ExisteUsuarioByIdValidator } from './validacao/existe-usuario-id.validator';

@Module({
  controllers: [UsuariosController],
  providers: [
    UsuariosRepository,
    UsuariosService,
    EmailEhUnicoValidator,
    ExisteUsuarioByIdValidator,
  ],
  exports: [ExisteUsuarioByIdValidator],
})
export class UsuariosModule {}
