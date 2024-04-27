import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AtualizaUsuarioRequest } from './dto/AtualizaUsuario.request';
import { CadastraUsuarioRequest } from './dto/CadastraUsuario.request';
import { UsuarioResponse } from './dto/Usuario.response';
import { UsuarioEntity } from './usuario.entity';
import { UsuariosRepository } from './usuarios.repository';

@Injectable()
export class UsuariosService {
  constructor(private repository: UsuariosRepository) {}

  public async cadastrar(request: CadastraUsuarioRequest): Promise<UsuarioResponse> {
    const usuario = this.mapEntity(request);

    this.repository.salvar(usuario);

    return new UsuarioResponse(usuario.id, usuario.nome);
  }

  public async atualizar(
    id: string,
    request: AtualizaUsuarioRequest,
  ): Promise<UsuarioEntity> {
    return await this.repository.atualizar(id, request);
  }

  public async remover(id: string): Promise<UsuarioEntity> {
    return this.repository.remover(id);
  }

  public async listar(): Promise<UsuarioResponse[]> {
    const usuariosSalvos: UsuarioEntity[] = await this.repository.listar();
    return usuariosSalvos.map((usuario) => new UsuarioResponse(usuario.id, usuario.nome));
  }

  private mapEntity(request: CadastraUsuarioRequest): UsuarioEntity {
    const usuario = new UsuarioEntity();
    usuario.email = request.email;
    usuario.senha = request.senha;
    usuario.nome = request.nome;
    usuario.idade = request.idade;
    usuario.id = uuid();

    return usuario;
  }
}
