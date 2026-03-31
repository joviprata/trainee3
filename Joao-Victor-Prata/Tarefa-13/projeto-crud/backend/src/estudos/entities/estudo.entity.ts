import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { DataEstudo } from './data-estudo.entity';

@Entity('estudos')
export class Estudo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  conteudo: string;

  @Column()
  anotacoes: string;

  @Column({ nullable: false })
  materia: string;

  @Column()
  professor: string;

  @Column({ nullable: false })
  dificuldade: number;

  @Column()
  prova_id: number;
}
