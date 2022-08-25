import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  template: ` <router-outlet></router-outlet> `,
})
export class EmployeesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
