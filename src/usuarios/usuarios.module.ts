import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosRepository } from './usuarios.repository';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosRepository],
})
export class UsuariosModule {}
