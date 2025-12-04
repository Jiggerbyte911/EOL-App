import { Routes } from '@angular/router';
import { Startseite } from './startseite/startseite';
import { Ozeaninfo } from './ozeaninfo/ozeaninfo';
import { Quiz } from './quiz/quiz';

export const routes: Routes = [
  { path: '', component: Startseite },
  { path: 'ozeane/:oceanId', component: Ozeaninfo },
  { path: 'ozeane/:oceanId/quiz', component: Quiz },
  //{ path: 'admin', component: AdminPage },
];
