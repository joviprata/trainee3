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

  getBorderColor(materia: string): string {
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

  deleteEstudo(estudo: Estudo) {
    return this.api.deleteEstudo(estudo.id).pipe(first()).subscribe(() => {
      window.location.reload();
    });
  }
}
