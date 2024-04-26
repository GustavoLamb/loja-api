import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Usuario } from './domain/Usuario';

@Injectable()
export class UsuariosRepository {
  private usuariosList: Array<Usuario> = [];

  public async salvar(newUsuario): Promise<Usuario> {
    const usuario: Usuario = { id: uuid(), ...newUsuario };
    this.usuariosList.push(usuario);
    return usuario;
  }

  public async listarUsuarios(): Promise<Usuario[]> {
    return this.usuariosList;
  }

  public async existeComEmail(email: string): Promise<boolean> {
    const possivelUsuario = this.usuariosList.find(
      (usuario) => usuario.email === email,
    );

    return possivelUsuario !== undefined;
  }

  public async existeComId(idUsuario: string): Promise<boolean> {
    const possivelUsuario = this.usuariosList.find(
      (usuario) => usuario.id === idUsuario,
    );

    return possivelUsuario !== undefined;
  }
}
