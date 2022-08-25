import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { EmployeeService } from '../../services/employee.service';
import * as employeeActions from '../../store/employee.actions';
import * as employeeSelector from '../../store/employee.selectors';
import { Level } from '../../models/level';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {
  selectedValue!: string;
  selectedCar!: string;

  levels: Level[] = [
    { value: 'intern', viewValue: 'Intern' },
    { value: 'junior', viewValue: 'Junior' },
    { value: 'middle', viewValue: 'Middle' },
    { value: 'senior', viewValue: 'Senior' },
  ];

  createForm: FormGroup;
  isEditFlowActive = false;
  private currentEmployeeIdOnEdit!: string;
  private employeeStore$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
  ) {
    this.employeeStore$ = new Subscription();
    this.createForm = this.initFormBuilder();
    this.prepareCreateOrUpdateFlow();
  }

  onFormSubmit(): void {
    if (this.isEditFlowActive) {
      const employeeToUpdate = {
        ...this.createForm.value,
        _id: this.currentEmployeeIdOnEdit,
      };
      this.store.dispatch(
        employeeActions.updateEmployee({ employee: employeeToUpdate })
      );
    } else {
      this.store.dispatch(
        employeeActions.createEmployee({ employee: this.createForm.value })
      );
    }
  }

  ngOnInit(): void {
    this.employeeStore$.add(
      this.store
        .select(employeeSelector.isCreateSuccess)
        .pipe(filter((done) => done))
        .subscribe(() => {
          this.resetForm();
          this.snackBar.open('Employee created!', 'OK', { duration: 2000 });
        })
    );
    this.employeeStore$.add(
      this.store
        .select(employeeSelector.isUpdateSuccess)
        .pipe(filter((done) => done))
        .subscribe(() =>
          this.snackBar.open('Employee updated!', 'OK', { duration: 2000 })
        )
    );
  }

  ngOnDestroy(): void {
    this.employeeStore$?.unsubscribe();
  }

  private initFormBuilder(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\w{3,24}@[a-z]{2,12}\\.[a-z]{2,5}$'),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      level: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });
  }

  private prepareCreateOrUpdateFlow() {
    const idFromUrlParam: string = this.activatedRoute.snapshot.params['id'];
    if (idFromUrlParam) {
      this.isEditFlowActive = true;
      this.currentEmployeeIdOnEdit = idFromUrlParam;
      this.store.dispatch(
        employeeActions.SelectEmployee({ id: idFromUrlParam })
      );
      this.store.dispatch(
        employeeActions.findOneEmployee({ id: idFromUrlParam })
      );
      this.handleBookSelectedChanges(idFromUrlParam);
    }
  }

  private handleBookSelectedChanges(id: string): void {
    this.employeeStore$.add(
      this.store
        .pipe(select(employeeSelector.selectCurrentEmployee))
        .subscribe((employeeSelected) => {
          if (!!employeeSelected) {
            const { name, email, phoneNumber, level, date } = employeeSelected;
            this.createForm.patchValue({
              name,
              email,
              phoneNumber,
              level,
              date,
            });
          }
        })
    );
  }

  private resetForm(): void {
    this.createForm.reset();
    Object.keys(this.createForm.controls).forEach((key) => {
      this.createForm.get(key)?.setErrors(null);
    });
  }
}
