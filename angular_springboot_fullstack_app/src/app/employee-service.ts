import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/api/V1/employees';

  private httpClient = inject(HttpClient);

  getEmployeeList(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseUrl}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.baseUrl}`, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.baseUrl}/${employee.id}`, employee);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`);
  } 
}
