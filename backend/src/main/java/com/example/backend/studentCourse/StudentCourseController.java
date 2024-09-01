package com.example.backend.studentCourse;


import com.example.backend.student.Student;
import com.example.backend.student.StudentRequest;
import com.example.backend.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/studentCourse")
public class StudentCourseController {
    private final StudentCourseService studentCourseService;

    @Autowired
    public StudentCourseController(StudentCourseService studentCourseService)  {
        this.studentCourseService = studentCourseService;
    }

    @GetMapping(path = "{studentCourseId}")
    public StudentCourse getStudentCourse(@PathVariable("studentCourseId") Long studentCourseId) {
        return studentCourseService.getStudentCourse(studentCourseId);
    }

    @GetMapping(path = "activeStudentCourses/{studentId}")
    public List<StudentCourse> activeStudentCourses(@PathVariable("studentId") Long studentId) {

        return studentCourseService.activeStudentCourses(studentId);
    }

    @GetMapping(path = "{sectionId}")
    public List<StudentCourse> getSectionStudents(@PathVariable("sectionId") Long sectionId) {
        return studentCourseService.getSectionStudents(sectionId);
    }

    @PostMapping
    public void registerNewStudentCourse(@RequestBody StudentCourseRequest studentCourse) {

        studentCourseService.addNewStudentCourse(studentCourse);
    }

    @DeleteMapping(path = "{studentCourseId}")
    public void deleteStudentCourse(@PathVariable("studentCourseId") Long studentCourseId) {
        studentCourseService.deleteStudentCourse(studentCourseId);
    }

    @PutMapping(path = "{studentCourseId}")
    public void updateStudentCourse(
            @PathVariable("studentCourseId") Long studentCourseId,
            @RequestBody StudentCourseRequest studentCourse) {
        studentCourseService.updateStudentCourse(studentCourseId, studentCourse);
    }
}
