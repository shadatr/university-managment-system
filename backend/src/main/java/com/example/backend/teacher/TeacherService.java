package com.example.backend.teacher;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;

    @Autowired
    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public List<Teacher> getTeachers() {
        return teacherRepository.findAll();
    }

    public Teacher getTeacher(Long teacherId) {
        return teacherRepository.findById(teacherId).orElseThrow(() -> new IllegalStateException(
                "Teacher with id " + teacherId + " does not exist"
        ));
    }

    public void addNewTeacher(Teacher Teacher) {
        Optional<Teacher> TeacherOptional = teacherRepository.findTeacherByEmail(Teacher.getEmail());
        if (TeacherOptional.isPresent()) {
            throw new IllegalStateException("email taken");
        }
        teacherRepository.save(Teacher);
    }

    public void deleteTeacher(Long TeacherId) {
        boolean exists = teacherRepository.existsById(TeacherId);
        if (!exists) {
            throw new IllegalStateException("Teacher with id " + TeacherId + " does not exist");
        }
        teacherRepository.deleteById(TeacherId);
    }

    @Transactional
    public void updateTeacher(Long TeacherId, Teacher Teacher) {
        Teacher TeacherToUpdate = teacherRepository.findById(TeacherId)
                .orElseThrow(() -> new IllegalStateException(
                        "Teacher with id " + Teacher.getId() + " does not exist"
        ));
        TeacherToUpdate.setName(Teacher.getName());
        TeacherToUpdate.setSurname(Teacher.getSurname());
        TeacherToUpdate.setEmail(Teacher.getEmail());
        TeacherToUpdate.setMajor(Teacher.getMajor());
        TeacherToUpdate.setDepartment(Teacher.getDepartment());
        TeacherToUpdate.setBirth_date(Teacher.getBirth_date());
        TeacherToUpdate.setPhone(Teacher.getPhone());
        TeacherToUpdate.setAddress(Teacher.getAddress());

    }

}




