import { Component, OnInit } from '@angular/core';
import { Level } from '../../models/level';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  selectedValue!: string;
  selectedCar!: string;

  levels: Level[] = [
    { value: 'inter', viewValue: 'Intern' },
    { value: 'junior', viewValue: 'Junior' },
    { value: 'middle', viewValue: 'Middle' },
    { value: 'senior', viewValue: 'Senior' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
