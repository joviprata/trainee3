import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Api, Estudo } from '../api';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-study-list',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './study-list.html',
  styleUrl: './study-list.scss',
})
export class StudyList {

  // estudos: any = null;

  // private destroyRef = inject(DestroyRef);

  // estudos: Estudo[] = [];

  // constructor(private api: Api) {

  // }

  // ngOnInit() {
  //   console.log('rodou ngOnInit');
  //   this.api.getEstudos().subscribe({
  //     next: (dados: any) => this.estudos = dados,
  //     error: (err) => this.estudos =  err,
  //   })
  // }

  estudos$: Observable<Estudo[]>;

  constructor(private api: Api) {
    this.estudos$= this.api.getEstudos();
  }

  getBorderColor(materia: string): string {
    if (materia === 'Matemática') {
      return "primary"
    }
    else if (materia === 'Ciências') {
      return "success"
    }
    else if (materia === 'Português') {
      return "danger"
    }
    else if (materia === 'História') {
      return "warning"
    }
    
    return "secondary"
  }

  // estudos: any = null;

  // private destroyRef = inject(DestroyRef);

  // constructor(private api: Api) {
  //   this.api
  //   .getEstudos()
  //   .pipe(takeUntilDestroyed(this.destroyRef))
  //   .subscribe({
  //     next: (dado) => (this.estudos = dado),
  //     error: (err) => (this.estudos = null),
  //   });
  // }

  

}
