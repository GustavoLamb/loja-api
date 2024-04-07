import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuariosRepository } from './usuarios.repository';

@Controller('/usuarios')
export class UsuariosController {
  constructor(private repository: UsuariosRepository) {}

  @Post()
  public async criarUsuarios(@Body() usuarioRequest) {
    return this.repository.salvar(usuarioRequest);
  }

  @Get()
  public async listarUsuarios() {
    return this.repository.listarUsuarios();
  }
}
