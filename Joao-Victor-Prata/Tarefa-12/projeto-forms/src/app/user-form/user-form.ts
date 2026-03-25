import { Component, computed } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
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
      validators: [ Validators.required, Validators.maxLength(255) ]
    }),
    email: new FormControl('', {
      validators: [ Validators.required, Validators.email, Validators.maxLength(255) ]
    })
    
  });

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
    console.log(this.savedUserData)
  }

  onReset() {
    this.savedUserData = null;
    this.userForm.reset();
  }
  
}
