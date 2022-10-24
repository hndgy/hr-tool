package fr.hndgy.hrtool.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.hndgy.hrtool.models.Employee;

public interface EmployeeRepository extends JpaRepository<Employee,Long>{
    
}
