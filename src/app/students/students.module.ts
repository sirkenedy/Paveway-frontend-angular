import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [StudentsComponent, DashboardComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }
