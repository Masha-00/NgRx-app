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

@NgModule({
  declarations: [
    EmployeeListComponent,
    CreateEmployeeComponent,
    DetailsEmployeeComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([EmployeeEffects]),
  ],
  exports: [],
})
export class EmployeesModule {}
