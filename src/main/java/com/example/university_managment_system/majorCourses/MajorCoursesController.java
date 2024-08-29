package com.example.university_managment_system.majorCourses;
import com.example.university_managment_system.major.Major;
import com.example.university_managment_system.major.MajorRequest;
import com.example.university_managment_system.major.MajorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/majorCourses")
public class MajorCoursesController {
    private final MajorCoursesService majorCoursesService;

    @Autowired
    public MajorCoursesController(MajorCoursesService majorCoursesService)  {
        this.majorCoursesService = majorCoursesService;
    }

    @GetMapping(path = "{majorCourseId}")
    public MajorCourses getMajorCourse(@PathVariable("majorCourseId") Long majorCourseId) {
        return majorCoursesService.getMajorCourse(majorCourseId);
    }

    @PostMapping
    public void registerNewMajorCourse(@RequestBody MajorCoursesRequest major) {
        majorCoursesService.addNewMajorCourse(major);
    }

    @DeleteMapping(path = "{majorId}")
    public void deleteMajorCourse(@PathVariable("majorId") Long majorId) {
        majorCoursesService.deleteMajorCourse(majorId);
    }

    @PutMapping(path = "{majorId}")
    public void updateMajorCourse(
            @PathVariable("majorId") Long majorId,
            @RequestBody MajorCoursesRequest Major) {
        majorCoursesService.updateMajorCourse(majorId, Major);
    }
}
