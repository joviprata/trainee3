import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { Estudo } from './estudo.entity';

@Entity('datas_estudo')
export class DataEstudo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  estudo_id: number;

  @Column({ nullable: false })
  data_estudo: Date;
}
