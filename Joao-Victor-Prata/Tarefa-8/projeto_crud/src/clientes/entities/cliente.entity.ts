import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientes') // Nome da tabela
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;
}
