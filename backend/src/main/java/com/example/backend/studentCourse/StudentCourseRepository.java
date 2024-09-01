package com.example.backend.studentCourse;

import com.example.backend.student.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

import java.util.Optional;

@Repository
public interface StudentCourseRepository extends JpaRepository<StudentCourse, Long> {

        @Query("SELECT s FROM StudentCourse s WHERE s.section.id = ?1")
        List<StudentCourse> findSectionStudents(Long sectionId);
}
