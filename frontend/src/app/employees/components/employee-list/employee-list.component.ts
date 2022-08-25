import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Employee } from '../../models/employee';
import * as employeeActions from '../../store/employee.actions';
import * as employeeSelector from '../../store/employee.selectors';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  private employeeStore$!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<{ employees: any }>
  ) {
    this.store.dispatch(employeeActions.findAllEmployees());
  }

  ngOnInit(): void {
    this.employeeStore$ = this.store
      .select(employeeSelector.selectAllEmployees)
      .subscribe((employees) => {
        this.employees = [...employees];
      });
  }

  ngOnDestroy(): void {
    this.employeeStore$?.unsubscribe();
  }

  onNavigateToCreateEmployeeView(): void {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }
}
