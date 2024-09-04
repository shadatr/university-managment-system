package com.example.backend.CourseSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface CourseSectionRepository extends JpaRepository<CourseSection, Long> {
     @Query("SELECT c FROM CourseSection c WHERE c.teacher.id = ?1 ")
    List<CourseSection> findCourseSectionByTeacherId(Long teacherId);
}
