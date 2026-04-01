import { Component, OnInit } from '@angular/core';
import { Api, Estudo } from '../api';
import { AsyncPipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Observable, first, map } from 'rxjs';

@Component({
  selector: 'app-study-list',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './study-list.html',
  styleUrl: './study-list.scss',
})

export class StudyList implements OnInit {

  estudos$: Observable<Estudo[]>;

  constructor(private api: Api, private router: Router) {
    this.estudos$ = this.api.getEstudos();
  }


  ngOnInit() {
    this.router.events.subscribe(() => {
      this.loadEstudos();
    });
  }
  
  loadEstudos() {
    this.estudos$ = this.api.getEstudos();
  }

  sortEstudos(campo: keyof Estudo) {
    this.estudos$ = this.estudos$.pipe(
      map(estudos =>
        [...estudos].sort((a, b) =>
          String(a[campo]).toLowerCase().localeCompare(String(b[campo]).toLowerCase())
        )
      ),
    );
    return this.estudos$.pipe(first()).subscribe();
  }

  getColor(materia: string): string {
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

  getDifficulty(dificuldade: number): [string, string, string, string, string] {
    if (dificuldade === 1) {
      return ["-fill", "", "", "", ""]
    }
    else if (dificuldade === 2) {
      return ["-fill", "-fill", "", "", ""]
    }
    else if (dificuldade === 3) {
      return ["-fill", "-fill", "-fill", "", ""]
    }
    else if (dificuldade === 4) {
      return ["-fill", "-fill", "-fill", "-fill", ""]
    }
    return ["-fill", "-fill", "-fill", "-fill", "-fill"]
  }

  deleteEstudo(estudo: Estudo) {
    return this.api.deleteEstudo(estudo.id).pipe(first()).subscribe(() => {
      window.location.reload();
    });
  }
}
