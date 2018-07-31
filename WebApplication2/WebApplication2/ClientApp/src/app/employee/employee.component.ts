import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
 
})
export class EmployeeComponent {
  public emp: Employee[];
  employee: Employee;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Employee[]>(baseUrl + 'api/Employee/Index').subscribe(result =>
    {
      console.log(result);
      this.emp = result;
    }, error => console.error(error));
  }
  add(emp: Employee) {
    alert(emp);
  }
}

interface Employee {
  id: number;
  name: string;
}
