package com.example.backend.teacher;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/teacher")
public class TeacherController {
    private final TeacherService teacherService;

    @Autowired
    public TeacherController(TeacherService teacherService)  {
        this.teacherService = teacherService;
    }

    @GetMapping
    public List<Teacher> getTeachers() {
        return teacherService.getTeachers();
    }

    @GetMapping(path = "{teacherId}")
    public Teacher getTeacher(@PathVariable("teacherId") Long teacherId) {
        return teacherService.getTeacher(teacherId);
    }

    @PostMapping
    public void registerNewTeacher(@RequestBody Teacher teacher) {
        teacherService.addNewTeacher(teacher);
    }

    @DeleteMapping(path = "{teacherId}")
    public void deleteTeacher(@PathVariable("teacherId") Long teacherId) {
        teacherService.deleteTeacher(teacherId);
    }

    @PutMapping(path = "{teacherId}")
    public void updateTeacher(
            @PathVariable("teacherId") Long teacherId,
            @RequestBody Teacher teacher) {
        teacherService.updateTeacher(teacherId, teacher);
    }
}
