import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { DetailsEmployeeComponent } from './components/details-employee/details-employee.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/employee.reducer';
import { featureKey } from './store/employee.state';
import { EmployeeEffects } from './store/employee.effects';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeListComponent,
    CreateEmployeeComponent,
    DetailsEmployeeComponent,
    EmployeeCardComponent,
    ...EmployeesRoutingModule.components,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([EmployeeEffects]),
  ],
  exports: [EmployeesComponent],
})
export class EmployeesModule {}
