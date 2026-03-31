import { Component, inject } from '@angular/core';
import { Api } from '../api';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { StudyCreate } from '../study-create/study-create';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-study-edit',
  imports: [ReactiveFormsModule, StudyCreate],
  templateUrl: './study-edit.html',
  styleUrl: './study-edit.scss',
})
export class StudyEdit extends StudyCreate {

  readonly estudoId: string;

  private activatedRoute = inject(ActivatedRoute);

  constructor(api: Api, router: Router) {

    super(api, router);

    this.estudoId = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.api.getEstudo(this.estudoId).subscribe(estudo => {
      this.studyForm.patchValue(estudo);
    });
  }

  override onSubmit() {
    this.router.navigate([''])
    return this.api.patchEstudo(this.estudoId, this.studyForm.value).pipe(first()).subscribe();
  }
}
