import { Action, createReducer, on } from '@ngrx/store';
import * as employeeState from './employee.state';
import * as employeeActions from './employee.actions';

const employeeReducer = createReducer(
  employeeState.initialstate,
  // SELECT ONE
  on(employeeActions.SelectEmployee, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  // FIND ALL
  on(employeeActions.findAllEmployees, (state) => ({
    ...state,
    action: employeeActions.type.FIND_ALL_EMPLOYEES,
    loading: true,
    error: null,
  })),
  on(employeeActions.findAllEmployeesSuccess, (state, { employees }) => {
    return employeeState.adapter.addMany(employees, {
      ...state,
      loading: false,
    });
  }),
  on(employeeActions.findAllEmployeesFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
  // FIND ONE
  on(employeeActions.findOneEmployee, (state) => ({
    ...state,
    action: employeeActions.type.FIND_ONE_EMPLOYEE,
    loading: true,
    error: null,
  })),
  on(employeeActions.findOneSuccess, (state, { employee }) => {
    return employeeState.adapter.setOne(employee, {
      ...state,
      loading: false,
    });
  }),
  on(employeeActions.findOneEmployeeFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
  // CREATE
  on(employeeActions.createEmployee, (state) => ({
    ...state,
    action: employeeActions.type.CREATE_EMPLOYEE,
    loading: true,
    error: null,
  })),
  on(employeeActions.createEmployeeSuccess, (state, { employee }) => {
    return employeeState.adapter.addOne(employee, {
      ...state,
      loading: false,
    });
  }),
  on(employeeActions.createEmployeeFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
  // UPDATE
  on(employeeActions.updateEmployee, (state) => ({
    ...state,
    action: employeeActions.type.UPDATE_EMPLOYEE,
    loading: true,
    error: null,
  })),
  on(employeeActions.updateEmployeeSuccess, (state, { employee }) => {
    return employeeState.adapter.updateOne(
      { id: employee._id, changes: employee },
      {
        ...state,
        loading: false,
      }
    );
  }),
  on(employeeActions.updateEmployeeFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
  // DELETE
  on(employeeActions.deleteEmployee, (state) => ({
    ...state,
    action: employeeActions.type.DELETE_EMPLOYEE,
    loading: true,
    error: null,
  })),
  on(employeeActions.deleteEmployeeSuccess, (state, { id }) => {
    return employeeState.adapter.removeOne(id, {
      ...state,
      loading: false,
    });
  }),
  on(employeeActions.deleteEmployeeFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  }))
);

export function reducer(state: employeeState.EmployeesState, action: Action) {
  return employeeReducer(state, action);
}
