package fr.hndgy.hrtool.services;

import java.util.List;

import fr.hndgy.hrtool.models.Employee;

public interface EmployeeService {
    List<Employee> getAllEmployees();
    void updateEmployee(Employee employee);
    Employee createEmployee(Employee employee);
    void deleteEmployee(Long employeeId);
}
