import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  onSubmit(dadosForm: NgForm) {
    if (dadosForm.form.invalid) {
      return;
    }

    const email = dadosForm.form.value.email
    const senha = dadosForm.form.value.senha

    console.log(dadosForm.form);
    console.log(email, senha);
  }
}
