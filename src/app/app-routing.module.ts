import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProjectComponent } from './components/project/create-project/create-project.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListProjectComponent } from './components/project/list-project/list-project.component';
import { ListDatabaseComponent } from './components/database/list-database/list-database.component';
import { ListTableComponent } from './components/table/list-table/list-table.component';


const routes: Routes = [
  { path: 'create-project', component: CreateProjectComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: LoginComponent },
  { path: 'list-project', component: ListProjectComponent, canActivate: [AuthGuard] },
  { path: 'list-database', component: ListDatabaseComponent, canActivate: [AuthGuard] },
  {
    path: 'list-table',
    component: ListTableComponent, canActivate: [AuthGuard]
  }
  // otherwise redirect to home
  // { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
