import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Employee } from '../models/employee';

export const adapter = createEntityAdapter<Employee>({
  selectId: (sensor: Employee) => sensor._id,
  sortComparer: false,
});

export interface EmployeesState extends EntityState<Employee> {
  selectedId: string | null;
  action: string | null;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialstate: EmployeesState = adapter.getInitialState({
  selectedId: null,
  action: null,
  loading: false,
  loaded: false,
  error: null,
});

export const featureKey = 'employees';
