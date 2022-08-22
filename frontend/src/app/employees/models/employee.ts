export type EmployeeId = '_id';

export interface Employee {
  _id: string;
  name: string;
  email: string;
  phoneNumber: number;
  level: string;
  date: Date;
}
