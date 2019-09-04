import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Database } from '../models/database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getDatabases(projectId): Observable<any> {
    const url = `${environment.baseURL}/databases?project_id=${projectId}`;
    return this.http.get<any>(url);
  }

  createDatabases(database: Database): Observable<any> {
    const url = `${environment.baseURL}/databases`;
    return this.http.post<any>(url, database);
  }

  deleteDatabase(database): Observable<any> {
    const url = `${environment.baseURL}/databases/${database.id}`;
    return this.http.delete<any>(url);
  }

  updateDatabase(database): Observable<any> {
    const url = `${environment.baseURL}/databases/${database.id}`;

    const payload = {
      user_id: 1,
      name: database.name,
      api_gateway_uri: 'testproject1.com',
      lambda_uri: 'lambdap1.com',
      vpc_name: 'testpff1',
      aws_region: database.region
    };
    return this.http.patch<any>(url, payload);
  }
}
