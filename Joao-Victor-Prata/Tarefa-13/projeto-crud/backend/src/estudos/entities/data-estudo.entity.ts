import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('datas')
export class Estudo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  estudo_id: number;

  @Column({ nullable: false })
  data_estudo: Timestamp;
}
