import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../employee-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-details',
  imports: [RouterLink],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})
export class EmployeeDetails {

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
}
