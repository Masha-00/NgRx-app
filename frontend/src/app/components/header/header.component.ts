import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeComponent } from 'src/app/employees/components/create-employee/create-employee.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  openCreateDialog() {
    this.dialog.open(CreateEmployeeComponent);
  }

  ngOnInit(): void {}
}
