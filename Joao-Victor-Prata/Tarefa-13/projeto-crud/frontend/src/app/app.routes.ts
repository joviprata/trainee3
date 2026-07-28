import { Routes } from '@angular/router';
import { StudyList } from './study-list/study-list';
import { StudyCreate } from './study-create/study-create';
import { StudyEdit } from './study-edit/study-edit';

export const routes: Routes = [
  {
    path: '',
    component: StudyList,
  },
  {
    path: 'new',
    component: StudyCreate,
  },
  {
    path: ':id/edit',
    component: StudyEdit,
  }
];
