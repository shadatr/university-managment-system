package com.example.backend.auth;

import com.example.backend.teacher.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.backend.teacher.TeacherRepository;
import com.example.backend.student.StudentRepository;
import com.example.backend.administrator.AdministratorRepository;
import com.example.backend.administrator.Administrator;
import com.example.backend.student.Student;
import com.example.backend.teacher.Teacher;

@RestController
@RequestMapping(path = "api/v1/auth")
public class AuthController {
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final AdministratorRepository administratorRepository;

    @Autowired
    public AuthController(StudentRepository studentRepository, TeacherRepository teacherRepository, AdministratorRepository administratorRepository)  {
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.administratorRepository = administratorRepository;
    }

    @GetMapping
    public Auth getUser( @RequestParam String role,
                         @RequestParam String email,
                         @RequestParam String password) {
        Auth auth1= new Auth();
        if ("admin".equals(role)) { // Use .equals for string comparison
            Administrator admin = administratorRepository.findAdministratorByEmailAndPassword(email, password);
            if (admin != null) {
                auth1.setRole(role);
                auth1.setId(admin.getId());
                auth1.setEmail(email);
                return auth1;
            }
        } else if ("teacher".equals(role)) {
            Teacher teacher = teacherRepository.findTeacherByEmailAndPassword(email, password);
            if (teacher != null) {
                auth1.setRole(role);
                auth1.setId(teacher.getId());
                auth1.setEmail(email);
                return auth1;
            }
        } else if ("student".equals(role)) {
            Student student = studentRepository.findStudentByEmailAndPassword(email, password);
            if (student != null) {
                auth1.setRole(role);
                auth1.setId(student.getId());
                auth1.setEmail(email);
                return auth1;
            }
        }
        return null;

    }

}
