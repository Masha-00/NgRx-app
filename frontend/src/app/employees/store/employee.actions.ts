import { createAction, props } from '@ngrx/store';
import { Employee, EmployeeId } from '../models/employee';

export enum type {
  SELECT_EMPLOYEE = '[ Employee ] Select a Employee',
  FIND_ALL_EMPLOYEES = '[ Employee ] Find All Employees',
  FIND_ALL_EMPLOYEES_FAIL = '[ Employee ] Find All Employees Fail',
  FIND_ALL_EMPLOYEES_SUCCESS = '[ Employee ] Find All Employees Success',
  FIND_ONE_EMPLOYEE = '[ Employee ] Find One Employee',
  FIND_ONE_EMPLOYEE_FAIL = '[ Employee ] Find One Employee Fail',
  FIND_ONE_EMPLOYEE_SUCCESS = '[ Employee ] Find One Employee Success',
  CREATE_EMPLOYEE = '[ Employee ] Create Employee',
  CREATE_EMPLOYEE_FAIL = '[ Employee ] Create Employee Fail',
  CREATE_EMPLOYEE_SUCCESS = '[ Employee ] Create Employee Success',
  UPDATE_EMPLOYEE = '[ Employee ] Update Employee',
  UPDATE_EMPLOYEE_FAIL = '[ Employee ] Update Employee Fail',
  UPDATE_EMPLOYEE_SUCCESS = '[ Employee ] Update Employee Success',
  DELETE_EMPLOYEE = '[ Employee ] Delete Employee',
  DELETE_EMPLOYEE_FAIL = '[ Employee ] Delete Employee Fail',
  DELETE_EMPLOYEE_SUCCESS = '[ Employee ] Delete Employee Success',
}

export const SelectEmployee = createAction(
  type.SELECT_EMPLOYEE,
  props<{ id: string }>()
);
export const findAllEmployees = createAction(type.FIND_ALL_EMPLOYEES);
export const findAllEmployeesFail = createAction(
  type.FIND_ALL_EMPLOYEES,
  props<{ error: any }>()
);
export const findAllEmployeesSuccess = createAction(
  type.FIND_ALL_EMPLOYEES_SUCCESS,
  props<{ employees: Array<Employee> }>()
);
export const findOneEmployee = createAction(
  type.FIND_ONE_EMPLOYEE,
  props<{ id: string }>()
);
export const findOneEmployeeFail = createAction(
  type.FIND_ONE_EMPLOYEE_FAIL,
  props<{ error: any }>()
);
export const findOneSuccess = createAction(
  type.FIND_ONE_EMPLOYEE_SUCCESS,
  props<{ employee: Employee }>()
);
export const createEmployee = createAction(
  type.CREATE_EMPLOYEE,
  props<{ employee: Omit<Employee, EmployeeId> }>()
);
export const createEmployeeFail = createAction(
  type.CREATE_EMPLOYEE_FAIL,
  props<{ error: any }>()
);
export const createEmployeeSuccess = createAction(
  type.CREATE_EMPLOYEE_SUCCESS,
  props<{ employee: Employee }>()
);
export const updateEmployee = createAction(
  type.UPDATE_EMPLOYEE,
  props<{ employee: Employee }>()
);
export const updateEmployeeFail = createAction(
  type.UPDATE_EMPLOYEE_FAIL,
  props<{ error: any }>()
);
export const updateEmployeeSuccess = createAction(
  type.UPDATE_EMPLOYEE_SUCCESS,
  props<{ employee: Employee }>()
);
export const deleteEmployee = createAction(
  type.DELETE_EMPLOYEE,
  props<{ id: string }>()
);
export const deleteEmployeeFail = createAction(
  type.DELETE_EMPLOYEE_FAIL,
  props<{ error: any }>()
);
export const deleteEmployeeSuccess = createAction(
  type.DELETE_EMPLOYEE_SUCCESS,
  props<{ id: string }>()
);
