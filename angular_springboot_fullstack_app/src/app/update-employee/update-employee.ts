import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee-service';
import { Employee } from '../employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-employee.html',
  styleUrl: './update-employee.css',
})
export class UpdateEmployee {

  // Injecting the required services.
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  employee: Employee = new Employee();
  loadData = signal(false); // Flag to indicate if data is being loaded.
  
  id = Number(this.activatedRoute.snapshot.params['id']); // Id of the Employee requested.
  
  failedMessage= signal('');

  constructor() {
    this.loadEmployeeById();
  }

  loadEmployeeById(){
    this.employeeService.getEmployeeById(this.id).subscribe(
      data => {
        console.log('Employee fetched successfully', data);
        this.employee = data; 
        this.loadData.set(true); // Data loaded successfully, set flag to true.
      },
      error => {
        console.error('Error fetching employee', error);
        this.router.navigate(['/employees'], {
          state: { message: 'Failed to fetch employee details. Please try again.' }
        });
      }
    )
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.employee).subscribe({
      next: () => {
        this.goToEmployeeList();
      },
      error: (error: any) => {
        console.error('Error updating employee', error);
        this.failedMessage.set("Failed to update employee. Please try again.");
      }
    });
  }

  goToEmployeeList() {
     this.router.navigate(['/employees'], {
          state: { message: 'Employee updated successfully!' }
        });
  }
}
  