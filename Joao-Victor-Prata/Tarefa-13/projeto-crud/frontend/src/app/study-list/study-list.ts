import { Component } from '@angular/core';
import { Api } from '../api';

@Component({
  selector: 'app-study-list',
  imports: [],
  templateUrl: './study-list.html',
  styleUrl: './study-list.scss',
})
export class StudyList {
  mensagem = "";

  constructor(private api: Api) {
    this.api.getMessage().subscribe({
      next: (res: any) => this.mensagem = res,
      error: (err) => this.mensagem = "Error fetching message",

    });
  }
}
