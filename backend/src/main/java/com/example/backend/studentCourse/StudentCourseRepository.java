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
        @Query("SELECT s FROM StudentCourse s WHERE s.student.id = ?1")
        List<StudentCourse> findCoursesByStudent(Long studentId);
        @Query("SELECT s FROM StudentCourse s WHERE s.student.id = ?1 AND s.section.id = ?2 AND s.active = true")
        Optional<StudentCourse> findStudentCourse(Long studentId, Long sectionId);
}
