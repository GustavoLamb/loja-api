import { Body, Controller, Get, Post } from '@nestjs/common';
import { CadastraUsuarioRequest } from './dto/CadastraUsuarioRequest';
import { UsuariosRepository } from './usuarios.repository';

@Controller('/usuarios')
export class UsuariosController {
  constructor(private repository: UsuariosRepository) {}

  @Post()
  public async criarUsuarios(@Body() usuarioRequest: CadastraUsuarioRequest) {
    return this.repository.salvar(usuarioRequest);
  }

  @Get()
  public async listarUsuarios() {
    return this.repository.listarUsuarios();
  }
}
