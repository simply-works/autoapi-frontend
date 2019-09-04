import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Table } from '../models/Table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  getTables(databaseId): Observable<any> {
    const url = `${environment.baseURL}/tables?database_id=${databaseId}`;
    return this.http.get<any>(url);
  }

  createTable(table: Table): Observable<any> {
    const url = `${environment.baseURL}/tables`;
    const payload = {
      user_id: 1,
      api_gateway_uri: 'testproject1.com',
      lambda_uri: 'lambdap1.com',
      vpc_name: 'testpff1',
    };

    return this.http.post<any>(url, table);
  }

  deleteTable(table): Observable<any> {
    const url = `${environment.baseURL}/tables/${table.id}`;
    return this.http.delete<any>(url);
  }

  updateTable(table): Observable<any> {
    const url = `${environment.baseURL}/tables/${table.id}`;

    return this.http.put<any>(url, table);
  }
}
