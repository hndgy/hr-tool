import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private httpClient : HttpClient) { }

  public getAllEmployees(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.apiServerUrl}/api/employee`);
  }
  
  public createEmployee(employee: Employee): Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.apiServerUrl}/api/employee`, employee);
  }
  
  public updateEmployee(employee: Employee): Observable<any>{
    return this.httpClient.put(`${this.apiServerUrl}/api/employee/${employee.id}`, employee);
  }
  
  public deleteEmployee(employeeId: number): Observable<any>{
    return this.httpClient.delete(`${this.apiServerUrl}/api/employee/${employeeId}`);
  }
}
