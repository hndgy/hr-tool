import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { AddEmployeeDialogComponent } from './add-employee-dialog/add-employee-dialog.component';
import { UpdateEmployeeDialogComponent } from './update-employee-dialog/update-employee-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {


  public employees : Employee[] = [];
  public dataSource = new MatTableDataSource(this.employees);
  public displayedColumns: string[] = ["id","firstName", "lastName","email"];
  constructor(
    private employeeService : EmployeeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(){
    this.employeeService.getAllEmployees().subscribe(
      (data : Employee[]) => {
        this.employees = data;
        this.dataSource = new MatTableDataSource(this.employees)
        console.log('Employees fetched',this.employees)
      }
    )
  }
  onAddEmployee(form: NgForm) {
    console.log("From value",form.value);
    this.employeeService.createEmployee(form.value).subscribe(
      (employee : Employee) => {
        console.log("new employee received", employee);
        this.employees.push(employee);
      })
  }

  onUpdateEmployee(form: NgForm){
    console.log("From value",form.value);
    this.employeeService.updateEmployee(form.value).subscribe(
      () => {
        this.fetchEmployees();
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result=> {
      if(result){
        this.onAddEmployee(result);
      }
    });
  }

  applyFilter(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClickRow(row: any){
    const dialogRef = this.dialog.open(UpdateEmployeeDialogComponent, {
      width: '1000px',
      data: row
    });
    dialogRef.afterClosed().subscribe(result=> {
      if(result){
        this.onUpdateEmployee(result);
      }
    });
  }


}


