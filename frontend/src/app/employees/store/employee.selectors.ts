import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeesState, featureKey, adapter } from './employee.state';
import * as employeeActions from './employee.actions';

const { selectEntities, selectAll } = adapter.getSelectors();

const getEmployeeState = createFeatureSelector<EmployeesState>(featureKey);

const selectEmployeeEntities = createSelector(getEmployeeState, selectEntities);

const selectEmployeeSensorId = createSelector(
  getEmployeeState,
  (state: EmployeesState) => state.selectedId
);

export const selectAllEmployees = createSelector(getEmployeeState, selectAll);

export const selectCurrentEmployee = createSelector(
  selectEmployeeEntities,
  selectEmployeeSensorId,
  (userEntities, userId) => userId && userEntities[userId]
);

export const isCreateSuccess = createSelector(
  getEmployeeState,
  (state: EmployeesState) =>
    state.action === employeeActions.type.CREATE_EMPLOYEE &&
    !state.loading &&
    !state.error
);

export const isUpdateSuccess = createSelector(
  getEmployeeState,
  (state: EmployeesState) =>
    state.action === employeeActions.type.UPDATE_EMPLOYEE &&
    !state.loading &&
    !state.error
);

export const isDeleteSuccess = createSelector(
  getEmployeeState,
  (state: EmployeesState) =>
    state.action === employeeActions.type.DELETE_EMPLOYEE &&
    !state.loading &&
    !state.error
);
