package com.example.university_managment_system.courses;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getCourses() {
        return courseRepository.findAll();
    }

    public Course getCourse(Long CourseId) {
        return courseRepository.findById(CourseId).orElseThrow(() -> new IllegalStateException(
                "Course with id " + CourseId + " does not exist"
        ));
    }

    public void addNewCourse(@RequestBody Course course) {
        courseRepository.save(course);
    }

    public void deleteCourse(Long CourseId) {
        boolean exists = courseRepository.existsById(CourseId);
        if (!exists) {
            throw new IllegalStateException("Course with id " + CourseId + " does not exist");
        }
        courseRepository.deleteById(CourseId);
    }

    @Transactional
    public void updateCourse(Long CourseId, @RequestBody Course course) {

        Course existingCourse = courseRepository.findById(CourseId)
                .orElseThrow(() -> new IllegalStateException(
                        "Course with id " + CourseId + " does not exist"
                ));

        existingCourse.setName(course.getName());
        existingCourse.setCredits(course.getCredits());
        existingCourse.setHours(course.getHours());

        courseRepository.save(existingCourse);
    }
}




