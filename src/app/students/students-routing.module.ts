import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsComponent } from './students.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'us', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
