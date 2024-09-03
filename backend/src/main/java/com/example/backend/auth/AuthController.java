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
    public Auth getAdministrators(AuthRequest auth) {
        String role=auth.getRole();
        long id= new Long(0);
        if (role=="admin"){
            Administrator admin= administratorRepository.findAdministratorByEmailAndPassword(auth.getEmail(),auth.getPassword());
            id=admin.getId();
        }
        else if (role=="teacher"){
            Teacher teacher= teacherRepository.findTeacherByEmailAndPassword(auth.getEmail(),auth.getPassword());
            id=teacher.getId();
        }
        else if (role=="student"){
            Student student= studentRepository.findStudentByEmailAndPassword(auth.getEmail(),auth.getPassword());
            id=student.getId();
        }
        Auth auth1= new Auth();
        auth1.setRole(role);
        auth1.setId(id);
        auth1.setEmail(auth.getEmail());
        return auth1;
    }

}
