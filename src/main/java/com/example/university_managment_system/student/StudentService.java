package com.example.university_managment_system.student;

import com.example.university_managment_system.department.Department;
import com.example.university_managment_system.major.Major;
import com.example.university_managment_system.major.MajorRepository;
import com.example.university_managment_system.major.MajorRequest;
import com.example.university_managment_system.teacher.Teacher;
import com.example.university_managment_system.teacher.TeacherRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final MajorRepository majorRepository;
    private final TeacherRepository teacherRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository, MajorRepository majorRepository, TeacherRepository teacherRepository) {
        this.studentRepository = studentRepository;
        this.majorRepository = majorRepository;
        this.teacherRepository = teacherRepository;
    }

    public Student getStudent(Long studentId) {
        return studentRepository.findById(studentId).orElseThrow(() -> new IllegalStateException(
                "student with id " + studentId + " does not exist"
        ));
    }

    public void addNewStudent(StudentRequest student) {
        Optional<Major> major = majorRepository.findById(student.getMajor_id());
        Optional<Teacher> advisor = teacherRepository.findById(student.getAdvisor());

        Student newStudent = new Student();
        newStudent.setName(student.getName());
        newStudent.setSurname(student.getSurname());
        newStudent.setEmail(student.getEmail());
        newStudent.setMajor(major.orElseThrow(() -> null));
        newStudent.setSemester(student.getSemester());
        newStudent.setBirth_date(student.getBirth_date());
        newStudent.setAdvisor(advisor.orElseThrow(() -> null));
        newStudent.setPhone(student.getPhone());
        newStudent.setAddress(student.getAddress());
        newStudent.setPassword(student.getPassword());

        studentRepository.save(newStudent);
    }

    public void deleteStudent(Long studentId) {
        boolean exists = studentRepository.existsById(studentId);
        if (!exists) {
            throw new IllegalStateException("student with id " + studentId + " does not exist");
        }
        studentRepository.deleteById(studentId);
    }

    @Transactional
    public void updateStudent(Long studentId, StudentRequest student) {
        Student studentToUpdate = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalStateException(
                        "student with id " + student.getId() + " does not exist"
        ));
        Major major = majorRepository.findById(student.getMajor_id()).orElseThrow(() -> new RuntimeException("Major not found"));
        Teacher advisor = teacherRepository.findById(student.getAdvisor()).orElseThrow(() -> new RuntimeException("Advisor not found"));
        studentToUpdate.setName(student.getName());
        studentToUpdate.setSurname(student.getSurname());
        studentToUpdate.setEmail(student.getEmail());
        studentToUpdate.setMajor(major);
        studentToUpdate.setSemester(student.getSemester());
        studentToUpdate.setEmail(student.getEmail());
        studentToUpdate.setBirth_date(student.getBirth_date());
        studentToUpdate.setAdvisor(advisor);
        studentToUpdate.setPhone(student.getPhone());
        studentToUpdate.setAddress(student.getAddress());
        studentToUpdate.setPassword(student.getPassword());

        studentRepository.save(studentToUpdate);
    }
}




