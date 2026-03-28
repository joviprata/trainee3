import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('estudos')
export class Estudo {
  @PrimaryGeneratedColumn()
  id: number;

  //data_estudo (multivalorado pois podem ter várias datas que o aluno estudou / estudará);

  @Column()
  descricao: string;

  @Column()
  materia: string;
}

// data_estudo                        date  (multivalorado, pode ter várias datas que estudei / estudarei)
// conteudo                           string
// descricao                          string
// materia (determinado já)           string     - dependendo disso muda a cor outline do container
// dificuldade(1 a 5)                 int
// professor                          string
// id_prova                           string
// data_prova                         date

// EM CERTA DATA

// ESTUDEI TAL CONTEÚDO

// DE TAL MATÉRIA
