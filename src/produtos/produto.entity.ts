import { Type } from 'class-transformer';
import { UsuarioEntity } from 'src/usuarios/usuario.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';
import { ProdutoImagemEntity } from './produto-imagem.entity';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  public nome: string;

  @Column({ type: 'decimal', name: 'valor', precision: 12, scale: 2, nullable: false })
  public valor: number;

  @Column({ name: 'quantidade_estoque', nullable: false })
  public quantidadeEstoque: number;

  @Column({ name: 'descriacao', length: 255, nullable: false })
  public descricao: string;

  @Column({ name: 'categoria', length: 100, nullable: false })
  public categoria: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.produtos, {
    eager: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public usuario: UsuarioEntity;

  @Type(() => ProdutoCaracteristicaEntity)
  @OneToMany(
    () => ProdutoCaracteristicaEntity,
    (caracteristicas) => caracteristicas.produto,
    { cascade: true, eager: true },
  )
  public caracteristicas: ProdutoCaracteristicaEntity[];

  @Type(() => ProdutoImagemEntity)
  @OneToMany(() => ProdutoImagemEntity, (imagens) => imagens.produto, {
    cascade: true,
    eager: true,
  })
  public imagens: ProdutoImagemEntity[];

  @CreateDateColumn({ name: 'data_criacao' })
  public dataCriacao: string;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  public dataAtualizacao: string;

  @DeleteDateColumn({ name: 'data_exclusao' })
  public dataExclusao: string;
}
