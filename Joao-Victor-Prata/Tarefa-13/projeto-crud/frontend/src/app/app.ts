import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from "./toolbar/toolbar";
import { StudyList } from "./study-list/study-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar, StudyList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
