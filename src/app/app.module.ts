import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CreateTableComponent } from './components/table/create-table/create-table.component';
import { EditTableComponent } from './components/table/edit-table/edit-table.component';
import { DeleteTableComponent } from './components/table/delete-table/delete-table.component';
import { CreateProjectComponent } from './components/project/create-project/create-project.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SidenavDirective } from './directives/sidenav.directive';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { SideNavComponent } from './shared/layout/side-nav/side-nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListProjectComponent } from './components/project/list-project/list-project.component';
import { CreateDatabaseComponent } from './components/database/create-database/create-database.component';
import { ToastrModule } from 'ngx-toastr';
import { DeleteProjectComponent } from './components/project/delete-project/delete-project.component';
import { ListTableComponent } from './components/table/list-table/list-table.component';
import { ListDatabaseComponent } from './components/database/list-database/list-database.component';
import { DeleteDatabaseComponent } from './components/database/delete-database/delete-database.component';
import { ViewTableDetailsComponent } from './components/table/view-table-details/view-table-details.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptors';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateTableComponent,
    EditTableComponent,
    DeleteTableComponent,
    CreateProjectComponent,
    DashboardComponent,
    SidenavDirective,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    ListProjectComponent,
    CreateDatabaseComponent,
    DeleteProjectComponent,
    ListTableComponent,
    ListDatabaseComponent,
    DeleteDatabaseComponent,
    ViewTableDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [
    DeleteProjectComponent,
    DeleteDatabaseComponent,
    CreateTableComponent,
    CreateDatabaseComponent,
    DeleteTableComponent,
    ViewTableDetailsComponent,
    EditTableComponent,
    CreateProjectComponent]
})
export class AppModule { }
