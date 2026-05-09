import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmployeeService } from '../employee-service';
import { inject } from '@angular/core';

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
}
