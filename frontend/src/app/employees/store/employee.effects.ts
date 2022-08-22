import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { EmployeeService } from '../services/employee.service';
import * as employeeActions from './employee.actions';

@Injectable()
export class EmployeeEffects {
  findAllEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.findAllEmployees),
      switchMap(() =>
        this.employeeService.getAllEmployees().pipe(
          map((employees) =>
            employeeActions.findAllEmployeesSuccess({ employees })
          ),
          catchError((error) =>
            of(employeeActions.findAllEmployeesFail({ error }))
          )
        )
      )
    )
  );

  findOneById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.findOneEmployee),
      switchMap((action) =>
        this.employeeService.findById(action.id).pipe(
          map((employee) => employeeActions.findOneSuccess({ employee })),
          catchError((error) =>
            of(employeeActions.findOneEmployeeFail({ error }))
          )
        )
      )
    )
  );

  createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.createEmployee),
      switchMap((action) =>
        this.employeeService.createEmployee(action.employee).pipe(
          map((employee) =>
            employeeActions.createEmployeeSuccess({ employee })
          ),
          catchError((error) =>
            of(employeeActions.createEmployeeFail({ error }))
          )
        )
      )
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.updateEmployee),
      switchMap((action) =>
        this.employeeService.updateEmployee(action.employee).pipe(
          map((employee) =>
            employeeActions.updateEmployeeSuccess({ employee })
          ),
          catchError((error) =>
            of(employeeActions.updateEmployeeFail({ error }))
          )
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.deleteEmployee),
      switchMap((action) =>
        this.employeeService.deleteEmployee(action.id).pipe(
          map(() => employeeActions.deleteEmployeeSuccess({ id: action.id })),
          catchError((error) =>
            of(employeeActions.deleteEmployeeFail({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}
}
