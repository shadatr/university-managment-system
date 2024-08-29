package com.example.backend.majorCourses;
import com.example.backend.major.Major;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MajorCoursesRepository extends JpaRepository<MajorCourses, Long> {
    @Query("SELECT d FROM Course d WHERE d.name = ?1")
    Optional<MajorCourses> findMajorByName(String name);
}
