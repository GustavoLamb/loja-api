import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuariosRepository {
  private usuariosList: Array<UsuarioEntity> = [];

  public async salvar(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    this.usuariosList.push(usuario);
    return usuario;
  }

  public async atualizar(
    id: string,
    dados: Partial<UsuarioEntity>,
  ): Promise<UsuarioEntity> {
    const usuario = this.consultarPorId(id);

    Object.entries(dados).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      usuario[chave] = valor;
    });

    return usuario;
  }

  public async remover(id: string): Promise<UsuarioEntity> {
    const usuario = this.consultarPorId(id);

    this.usuariosList = this.usuariosList.filter(
      (usuarioSalvo) => usuarioSalvo.id !== usuario.id,
    );

    return usuario;
  }

  public async listar(): Promise<UsuarioEntity[]> {
    return this.usuariosList;
  }

  public consultarPorId(id: string): UsuarioEntity {
    const possivelUsuario = this.usuariosList.find((usuario) => usuario.id == id);

    if (!possivelUsuario) {
      throw new Error('Usuário não existe');
    }

    return possivelUsuario;
  }

  public async existeComEmail(email: string): Promise<boolean> {
    const possivelUsuario = this.usuariosList.find((usuario) => usuario.email === email);

    return possivelUsuario !== undefined;
  }

  public async existeComId(idUsuario: string): Promise<boolean> {
    const possivelUsuario = this.usuariosList.find((usuario) => usuario.id === idUsuario);

    return possivelUsuario !== undefined;
  }
}
