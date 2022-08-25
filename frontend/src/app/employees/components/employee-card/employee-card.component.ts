import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Employee } from '../../models/employee';
import * as employeeActions from '../../store/employee.actions';
import * as employeeSelector from '../../store/employee.selectors';
import { MatDialog } from '@angular/material/dialog';
import { DetailsEmployeeComponent } from '../details-employee/details-employee.component';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css'],
})
export class EmployeeCardComponent implements OnInit, OnDestroy {
  @Input() employee!: Employee;
  private employeeStore$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store,
    public dialog: MatDialog
  ) {
    this.employeeStore$ = new Subscription();
  }

  ngOnInit(): void {
    this.employeeStore$.add(
      this.store
        .select(employeeSelector.isDeleteSuccess)
        .pipe(filter((done) => !!done))
        .subscribe(() =>
          this.snackBar.open('Employee deleted!', 'OK', { duration: 2000 })
        )
    );
  }

  ngOnDestroy(): void {
    this.employeeStore$?.unsubscribe();
  }

  onClickRemoveEmployee(id: string): void {
    this.store.dispatch(employeeActions.deleteEmployee({ id }));
  }

  onEmployeeDetailNavigate(employee: Employee): void {
    this.router.navigate([employee._id], { relativeTo: this.activatedRoute });
  }

  openDetails(employee: Employee) {
    this.dialog.open(DetailsEmployeeComponent, { data: employee });
  }
}
