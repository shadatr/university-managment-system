package com.example.university_managment_system.courses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/course")
public class CourseController {
    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService)  {
        this.courseService = courseService;
    }

    @GetMapping
    public List<Course> getCourses() {
        return courseService.getCourses();
    }

    @GetMapping(path = "{courseId}")
    public Course getCourse(@PathVariable("courseId") Long courseId) {
        return courseService.getCourse(courseId);
    }

    @PostMapping
    public void registerNewcourse(@RequestBody Course course) {
        courseService.addNewCourse(course);
    }

    @DeleteMapping(path = "{courseId}")
    public void deletecourse(@PathVariable("courseId") Long courseId) {
        courseService.deleteCourse(courseId);
    }

    @PutMapping(path = "{courseId}")
    public void updatecourse(
            @PathVariable("courseId") Long courseId,
            @RequestBody Course course) {
        courseService.updateCourse(courseId, course);
    }
}
