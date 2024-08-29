package com.example.university_managment_system.department;
import com.example.university_managment_system.major.Major;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    @Query("SELECT d FROM Department d WHERE d.name = ?1")
    Optional<Department> findDepartmentByName(String name);
    @Query("SELECT d FROM Major d WHERE d.department.id = ?1")
    List<Major> findDepartmentMajors(Long id);
}
