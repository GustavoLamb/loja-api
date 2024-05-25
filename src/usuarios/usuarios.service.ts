import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { AtualizaUsuarioRequest } from './dto/AtualizaUsuario.request';
import { CadastraUsuarioRequest } from './dto/CadastraUsuario.request';
import { UsuarioResponse } from './dto/Usuario.response';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuariosRepository: Repository<UsuarioEntity>,
  ) {}

  public async listar(): Promise<UsuarioResponse[]> {
    const usuariosSalvos: UsuarioEntity[] = await this.usuariosRepository.find();
    return usuariosSalvos.map((usuario) => this.mapToRespose(usuario));
  }

  public async consultar(id: string): Promise<UsuarioResponse> {
    const usuario = await this.consultarPorId(id);

    return this.mapToRespose(usuario);
  }

  public async cadastrar(request: CadastraUsuarioRequest): Promise<UsuarioResponse> {
    const usuario = plainToInstance(UsuarioEntity, request);

    this.usuariosRepository.save(usuario);

    return this.mapToRespose(usuario);
  }

  public async atualizar(
    id: string,
    request: AtualizaUsuarioRequest,
  ): Promise<UsuarioResponse> {
    await this.usuariosRepository.update(id, request);

    return this.consultar(id);
  }

  public async remover(id: string): Promise<UsuarioResponse> {
    const usuario = await this.consultarPorId(id);

    this.usuariosRepository.delete(id);

    return this.mapToRespose(usuario);
  }

  private async consultarPorId(id: string): Promise<UsuarioEntity> {
    const possivelUsuario = this.usuariosRepository.findOneBy({ id: id });

    if (!possivelUsuario) {
      throw new Error('Usuário não existe');
    }

    return possivelUsuario;
  }

  private mapToRespose(entity: UsuarioEntity): UsuarioResponse {
    return plainToInstance(UsuarioResponse, entity, { excludeExtraneousValues: true });
  }
}
