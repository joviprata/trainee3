import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Api } from '../api';
import { first } from 'rxjs';

@Component({
  selector: 'app-study-create',
  imports: [ReactiveFormsModule],
  templateUrl: './study-create.html',
  styleUrl: './study-create.scss',
})
export class StudyCreate {
  @Input() studyForm = new FormGroup({
    conteudo: new FormControl('', {
      validators: [
        Validators.required, Validators.maxLength(255)
      ]
    }),

    anotacoes: new FormControl('', {
      validators: [
        Validators.maxLength(1000)
      ]
    }),

    materia: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),

    professor: new FormControl('', {
      validators: [
        Validators.maxLength(255)
      ]
    }),

    dificuldade: new FormControl(1, {
      validators: [
        Validators.required
      ]
    }),
    //...
  })

  constructor(protected api: Api, protected router: Router) {}

  onSubmit() {
    this.router.navigate([''])
    return this.api.postEstudo(this.studyForm.value).pipe(first()).subscribe();
  }
}
