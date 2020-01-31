import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent, SignupComponent, DashboardComponent, HomeComponent } from './components';
import { AuthGuard } from './_guard/auth.guard';
import { Role } from './_models'


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Student] }
  },
  {
    path: 'student',
    canActivate : [AuthGuard],
    data: { roles: [Role.Student] },
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
