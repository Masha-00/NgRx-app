import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

const employeesRoutes: Routes = [
  {
    path: 'employee',
    children: [
      {
        path: '',
        component: EmployeeListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(employeesRoutes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {
  static components = [EmployeeListComponent];
}
