import { ProdutoEntity } from 'src/produtos/produto.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  public nome: string;

  @Column({ name: 'email', length: 75, nullable: false })
  public email: string;

  @Column({ type: 'int', name: 'idade', nullable: false })
  public idade: number;

  @Column({ name: 'senha', length: 255, nullable: false })
  public senha: string;

  @OneToMany(() => ProdutoEntity, (produto) => produto.usuario)
  @JoinColumn({ name: 'usuario_id' })
  public produtos: ProdutoEntity[];

  @CreateDateColumn({ name: 'data_criacao' })
  public dataCriacao: string;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  public dataAtualizacao: string;

  @DeleteDateColumn({ name: 'data_exclusao' })
  public dataExclusao: string;
}
