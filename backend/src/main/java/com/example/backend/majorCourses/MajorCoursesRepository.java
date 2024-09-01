package com.example.backend.majorCourses;
import com.example.backend.major.Major;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

import java.util.Optional;

@Repository
public interface MajorCoursesRepository extends JpaRepository<MajorCourses, Long> {

    @Query("SELECT d FROM MajorCourses d WHERE d.major.id = ?1")
    List<MajorCourses> findMajorCourses(Long majorId);
}
