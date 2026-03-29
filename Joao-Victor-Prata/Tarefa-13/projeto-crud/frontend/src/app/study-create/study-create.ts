import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-study-create',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './study-create.html',
  styleUrl: './study-create.scss',
})
export class StudyCreate {
  studyForm = new FormGroup({
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

    
  })

  estudo: any = null;

  onSubmit() {
    this.estudo = this.studyForm.value;
    console.log(this.estudo);
  }
}
