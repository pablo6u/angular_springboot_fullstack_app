import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { EmployeeService } from '../employee-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {

  private employeeService = inject(EmployeeService);

  employeeList: Employee[] = [];
  loadData = signal(false); // Flag to indicate if data is being loaded.

  constructor() {
    this.loadEmployeeList();
  }

  private router = inject(Router);

  message = this.router.getCurrentNavigation()?.extras.state?.['message'] ?? ''; // deprecated in Angular 16, will be removed in Angular 17. Used only for demonstration purposes.

  loadEmployeeList() {
    this.employeeService.getEmployeeList().subscribe(
      data => {
        this.employeeList = data;
        this.loadData.set(true);
      },
      error => {
        this.message = "Failed to load employee list. Please try again.";
      }
    );
  }

  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
        this.loadData.set(false);
        this.loadEmployeeList();
        this.message = "Employee deleted successfully!";
      },
      error => {
        this.message = "Failed to delete employee. Please try again.";
      }
    );
  }
}
