import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmployeeService } from '../employee-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {

  private employeeService = inject(EmployeeService);

  employees$ = this.employeeService.getEmployeeList();

  private router = inject(Router);

  message = this.router.getCurrentNavigation()?.extras.state?.['message'] ?? ''; // deprecated in Angular 16, will be removed in Angular 17. Used only for demonstration purposes.

  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]);
  }
}
