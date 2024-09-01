package com.example.backend.majorCourses;
import com.example.backend.major.Major;
import com.example.backend.major.MajorRequest;
import com.example.backend.major.MajorService;
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

    @GetMapping(path = "major/{majorId}")
    public List<MajorCourses> getMajorCourses(@PathVariable("majorId") Long majorId) {
        return majorCoursesService.getMajorCourses(majorId);
    }

    @PostMapping
    public void registerNewMajorCourse(@RequestBody MajorCoursesRequest major) {
        majorCoursesService.addNewMajorCourse(major);
    }

    @DeleteMapping(path = "{majorCourseId}")
    public void deleteMajorCourse(@PathVariable("majorCourseId") Long majorCourseId) {
        majorCoursesService.deleteMajorCourse(majorCourseId);
    }

    @PutMapping(path = "{majorId}")
    public void updateMajorCourse(
            @PathVariable("majorId") Long majorId,
            @RequestBody MajorCoursesRequest Major) {
        majorCoursesService.updateMajorCourse(majorId, Major);
    }
}
