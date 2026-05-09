import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeList } from './employee-list/employee-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmployeeList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular_springboot_fullstack_app');
}
