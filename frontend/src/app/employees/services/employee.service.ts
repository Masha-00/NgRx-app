import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Employee, EmployeeId } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl: string = 'http://localhost:4000/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(`${this.baseUrl}`);
  }

  findById(id: any): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: Omit<Employee, EmployeeId>): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/create`, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const { _id, ...fieldsToUpdate } = employee;
    return this.http.put<Employee>(
      `${this.baseUrl}/update/${_id}`,
      fieldsToUpdate
    );
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
