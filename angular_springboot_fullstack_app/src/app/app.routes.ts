import { Routes } from '@angular/router';
import { EmployeeList } from './employee-list/employee-list';
import { CreateEmployee } from './create-employee/create-employee';
import { UpdateEmployee } from './update-employee/update-employee';

export const routes: Routes = [
    {path: 'employees', component: EmployeeList},
    {path: 'create-employee', component: CreateEmployee},
    {path: 'update-employee/:id', component: UpdateEmployee},
    {path: '', redirectTo: '/employees', pathMatch: 'full'}
];
