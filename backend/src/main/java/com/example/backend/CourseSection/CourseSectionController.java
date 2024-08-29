package com.example.backend.CourseSection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/courseSection")
public class CourseSectionController {
    private final CourseSectionService courseSectionService;

    @Autowired
    public CourseSectionController(CourseSectionService courseSectionService)  {
        this.courseSectionService = courseSectionService;
    }

    @GetMapping
    public List<CourseSection> getCourseSections() {
        return courseSectionService.getCourseSections();
    }

    @GetMapping(path = "{courseSectionId}")
    public CourseSection getCourseSection(@PathVariable("courseSectionId") Long courseSectionId) {
        return courseSectionService.getCourseSection(courseSectionId);
    }

    @PostMapping
    public void registerNewCourseSection(@RequestBody CourseSectionRequest courseSection) {
        courseSectionService.addNewCourseSection(courseSection);
    }

    @DeleteMapping(path = "{courseSectionId}")
    public void deleteCourseSection(@PathVariable("courseSectionId") Long courseSectionId) {
        courseSectionService.deleteCourseSection(courseSectionId);
    }

    @PutMapping(path = "{courseSectionId}")
    public void updateCourseSection(
            @PathVariable("courseSectionId") Long courseSectionId,
            @RequestBody CourseSectionRequest courseSection) {
        courseSectionService.updateCourseSection(courseSectionId, courseSection);
    }
}
