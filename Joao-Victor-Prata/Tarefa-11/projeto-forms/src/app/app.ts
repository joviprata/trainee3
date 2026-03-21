import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserForm } from './user-form/user-form';
import { Header } from "./header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserForm, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projeto-forms');
}
