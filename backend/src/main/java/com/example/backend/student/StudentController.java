package com.example.backend.student;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/student")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService)  {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getStudents() {
        return studentService.getStudents();
    }

    @GetMapping(path = "{studentId}")
    public Student getStudent(@PathVariable("studentId") Long studentId) {
        return studentService.getStudent(studentId);
    }
    @GetMapping(path = "byEmail/{studentId}")
    public Student getStudent(@PathVariable("studentId") Long studentId) {
        return studentService.getStudent(studentId);
    }

    @GetMapping(path = "majorStudents/{majorId}")
    public List<Student> getMajorStudent(@PathVariable("majorId") Long majorId) {
        return studentService.getMajorStudent(majorId);
    }

    @GetMapping(path = "advisorStudents/{advisorId}")
    public List<Student> getAdvisorStudents(@PathVariable("advisorId") Long advisorId) {
        return studentService.getAdvisorStudents(advisorId);
    }


    @PostMapping
    public void registerNewStudent(@RequestBody StudentRequest student) {
        studentService.addNewStudent(student);
    }

    @DeleteMapping(path = "{studentId}")
    public void deleteStudent(@PathVariable("studentId") Long studentId) {
        studentService.deleteStudent(studentId);
    }

    @PutMapping(path = "{studentId}")
    public void updateStudent(
            @PathVariable("studentId") Long studentId,
            @RequestBody StudentRequest student) {
        studentService.updateStudent(studentId, student);
    }
}
