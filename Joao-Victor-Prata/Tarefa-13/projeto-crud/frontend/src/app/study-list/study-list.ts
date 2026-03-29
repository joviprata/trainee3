import { Component } from '@angular/core';
import { Api, Estudo } from '../api';
import { AsyncPipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { first, Observable } from 'rxjs';

@Component({
  selector: 'app-study-list',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './study-list.html',
  styleUrl: './study-list.scss',
})
export class StudyList {

  estudos$: Observable<Estudo[]>;

  constructor(private api: Api, private router: Router) {
    this.estudos$= this.api.getEstudos();
  }

  getBgColor(materia: string): string {
    if (materia === 'Matemática') {
      return "primary"
    }
    else if (materia === 'Ciências') {
      return "success"
    }
    else if (materia === 'Português' || materia === 'Inglês' || materia === 'Arte' || materia === 'Educação Física') {
      return "danger"
    }
    else if (materia === 'História' || materia === 'Geografia' || materia === 'Ensino Religioso') {
      return "warning"
    }
    return "secondary"
  }

  getDificulty(dificuldade: number): [string, string] {
    if (dificuldade === 5) {
      return ["tear-fill", "Muito difícil"]
    }
    else if (dificuldade === 4) {
      return ["frown-fill", "Difícil"]
    }
    else if (dificuldade === 3) {
      return ["neutral-fill", "Médio"]
    }
    else if (dificuldade === 2) {
      return ["smile-fill", "Fácil"]
    }
    return ["laughing-fill", "Muito fácil"]
  }

  deleteEstudo(estudo: Estudo) {
    return this.api.deleteEstudo(estudo.id).pipe(first()).subscribe(() => {
      window.location.reload();
    });
  }
}
