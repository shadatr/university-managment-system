package com.example.university_managment_system.student;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student getStudent(Long studentId) {
        return studentRepository.findById(studentId).orElseThrow(() -> new IllegalStateException(
                "student with id " + studentId + " does not exist"
        ));
    }

    public void addNewStudent(Student student) {
        Optional<Student> studentOptional = studentRepository.findStudentByEmail(student.getEmail());
        if (studentOptional.isPresent()) {
            throw new IllegalStateException("email taken");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        boolean exists = studentRepository.existsById(studentId);
        if (!exists) {
            throw new IllegalStateException("student with id " + studentId + " does not exist");
        }
        studentRepository.deleteById(studentId);
    }

    @Transactional
    public void updateStudent(Long studentId, Student student) {
        Student studentToUpdate = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalStateException(
                        "student with id " + student.getId() + " does not exist"
        ));
        studentToUpdate.setName(student.getName());
        studentToUpdate.setSurname(student.getSurname());
        studentToUpdate.setEmail(student.getEmail());
        studentToUpdate.setMajor_id(student.getMajor_id());
        studentToUpdate.setSemester(student.getSemester());
        studentToUpdate.setEmail(student.getEmail());
        studentToUpdate.setBirth_date(student.getBirth_date());
        studentToUpdate.setAdvisor(student.getAdvisor());
        studentToUpdate.setPhone(student.getPhone());
        studentToUpdate.setAddress(student.getAddress());
        studentToUpdate.setPassword(student.getPassword());

    }

    public List<Student> getStudentsByMajor(Integer majorId) {
        return studentRepository.findStudentsByMajor(majorId);
    }
}




