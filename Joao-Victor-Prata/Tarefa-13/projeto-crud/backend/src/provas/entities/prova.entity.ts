import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('provas')
export class Prova {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column()
  data_prova: Timestamp;
}
