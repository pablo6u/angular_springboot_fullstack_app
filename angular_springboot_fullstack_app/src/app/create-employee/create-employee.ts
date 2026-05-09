import { Component, inject, signal } from '@angular/core';
import { Employee } from '../employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  imports: [FormsModule],
  templateUrl: './create-employee.html',
  styleUrl: './create-employee.css',
})
export class CreateEmployee {

  employee: Employee = new Employee();

  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  failedMessage= signal('');

  onSubmit() {
    this.employeeService.createEmployee(this.employee).subscribe({
      next: () => {
        this.goToEmployeeList();
      },
      error: (error: any) => {
        console.error('Error creating employee', error);
        this.failedMessage.set("Failed to create employee. Please try again.");
      }
    });
  }

  goToEmployeeList() {
     this.router.navigate(['/employees'], {
          state: { message: 'Employee created successfully!' }
        });
  }
}
