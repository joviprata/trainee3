import { Component, signal } from '@angular/core';
import { UserForm } from './user-form/user-form';
import { Header } from "./header/header";

@Component({
  selector: 'app-root',
  imports: [UserForm, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projeto-forms');
}
