import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})

export class UserForm {
  userForm = new FormGroup({
    nome: new FormControl('', {
      validators: [
        Validators.required, Validators.maxLength(255)
      ]
    }),

    email: new FormControl('', {
      validators: [ 
        Validators.required, Validators.email, Validators.maxLength(255)
      ]
    }),

    telefones: new FormArray([
      new FormControl('', {
        validators: [
          Validators.required, Validators.minLength(14), Validators.maxLength(15)
        ]
      })
    ])
  });

  get telefones() {
    return this.userForm.controls.telefones as FormArray;
  }

  get hasInvalidTelephone() {
    return this.telefones.controls.some(control => control.invalid);
  }

  addTelephone() {
    if (this.telefones.length >= 10) return;
    this.telefones.push(new FormControl('', {
      validators: [
        Validators.required, Validators.minLength(14), Validators.maxLength(15)
      ]
    }));
  }

  removeTelephone(index: number) {
    this.telefones.removeAt(index);
  }

  formatTelephone(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length <= 10) {
      value = value
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      value = value
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }

    event.target.value = value;
  }

  get nameIsInvalid() {
    return (
      this.userForm.controls.nome.touched &&
      this.userForm.controls.nome.invalid
    )
  }

  get emailIsInvalid() {
    return (
      this.userForm.controls.email.touched &&
      this.userForm.controls.email.dirty &&
      this.userForm.controls.email.invalid
    );
  }

  savedUserData: any = null;

  onSubmit() {
    this.savedUserData = this.userForm.value;
  }

  onReset() {
    this.savedUserData = null;
    this.userForm.reset();
  }
}
