import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuariosRepository {
  private usuariosList = [];

  public async salvar(usuario) {
    this.usuariosList.push(usuario);
  }

  public async listarUsuarios() {
    return this.usuariosList;
  }
}
