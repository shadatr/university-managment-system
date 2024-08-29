package com.example.university_managment_system.CourseSections;
import com.example.university_managment_system.major.Major;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseSectionRepository extends JpaRepository<CourseSection, Long> {
}
