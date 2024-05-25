import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AtualizaUsuarioRequest } from './dto/AtualizaUsuario.request';
import { CadastraUsuarioRequest } from './dto/CadastraUsuario.request';
import { UsuarioResponse } from './dto/Usuario.response';
import { UsuariosService } from './usuarios.service';

@Controller('/usuarios')
export class UsuariosController {
  constructor(private service: UsuariosService) {}

  @Get()
  public async listarUsuarios(): Promise<UsuarioResponse[]> {
    return this.service.listar();
  }

  @Get(':id')
  public async consultarUsuario(@Param('id') id: string): Promise<UsuarioResponse> {
    return this.service.consultar(id);
  }

  @Post()
  public async cadastrarUsuario(
    @Body() request: CadastraUsuarioRequest,
  ): Promise<UsuarioResponse> {
    return this.service.cadastrar(request);
  }

  @Patch(':id')
  public async atualizarUsuario(
    @Param('id') id: string,
    @Body() request: AtualizaUsuarioRequest,
  ): Promise<UsuarioResponse> {
    return this.service.atualizar(id, request);
  }

  @Delete(':id')
  public async removerUsuario(@Param('id') id: string): Promise<UsuarioResponse> {
    return this.service.remover(id);
  }
}
