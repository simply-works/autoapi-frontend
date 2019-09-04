import { Injectable } from '@angular/core';
import { Project } from '../models/Project';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[];
  constructor(private http: HttpClient) { }
  token = JSON.parse(localStorage.getItem('currentUser')).access_token;


  getProjects(): Observable<any> {
    const url = `${environment.baseURL}/projects`;
    return this.http.get<any>(url);
  }

  createProject(project: Project): Observable<any> {
    const token = JSON.parse(localStorage.getItem('currentUser')).access_token;
    const url = `${environment.baseURL}/projects`;
    const payload = {
      user_id: 1,
      name: project.name,
      aws_region: project.region
    };
    return this.http.post<any>(url, payload);
  }

  deleteProject(project): Observable<any> {
    const url = `${environment.baseURL}/projects/${project.id}`;
    return this.http.delete<any>(url);
  }

  updateProject(project): Observable<any> {
    const url = `${environment.baseURL}/projects/${project.id}`;
    const payload = {
      user_id: 1,
      name: project.name,
      api_gateway_uri: 'testproject1.com',
      lambda_uri: 'lambdap1.com',
      vpc_name: 'testpff1',
      aws_region: project.region
    };
    return this.http.patch<any>(url, payload);
  }

  getProjectsById(id) {
    const url = `${environment.baseURL}/projects/${id}`;
    return this.http.get<any>(url);
  }
}
