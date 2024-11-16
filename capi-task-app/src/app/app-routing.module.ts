import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { ProfileComponent } from './profile/profile.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component'; // Importa el componente TaskDetailsComponent

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/create', component: CreateTaskComponent },
  { path: 'tasks/create/:id', component: CreateTaskComponent },
  { path: 'tasks/task-details/:id', component: TaskDetailsComponent }, // Ruta dinámica para el detalle de la tarea
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
