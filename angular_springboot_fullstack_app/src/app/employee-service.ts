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
}
