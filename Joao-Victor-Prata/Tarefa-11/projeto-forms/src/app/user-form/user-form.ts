import { KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, KeyValuePipe],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {

  formatData(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    value = value
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .slice(0, 10);

    event.target.value = value;
  }

  validateData(valor: string, control: any) {
    if (!valor) return;

    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    if (!regex.test(valor)) {
      control.control.setErrors({ dataInvalida: true });
      return;
    }

    const [_, diaStr, mesStr, anoStr] = valor.match(regex)!;

    const dia = +diaStr;
    const mes = +mesStr;
    const ano = +anoStr;

    if (mes < 1 || mes > 12) {
      control.control.setErrors({ dataInvalida: true });
      return;
    }

    const diasNoMes = new Date(ano, mes, 0).getDate();

    if (dia < 1 || dia > diasNoMes) {
      control.control.setErrors({ dataInvalida: true });
      return;
    }

    control.control.setErrors(null);
  }

  formatCPF(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    value = value
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    event.target.value = value;
  }

  formatCEP(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    value = value.replace(/(\d{5})(\d)/, '$1-$2');

    event.target.value = value;
  }

  formatTelefone(event: any) {
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

  ordemOriginalForm = () => 0;

  dadosSalvos: any = null;

  onSubmit(dadosForm: NgForm) {
    this.dadosSalvos = dadosForm.value;
  }

  onReset() {
    this.dadosSalvos = null;
  }
}
