package com.example.university_managment_system.major;
import com.example.university_managment_system.department.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MajorRepository extends JpaRepository<Major, Long> {
    @Query("SELECT d FROM Major d WHERE d.name = ?1")
    Optional<Major> findMajorByName(String name);
}
