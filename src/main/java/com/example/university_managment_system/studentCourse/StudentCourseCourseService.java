package com.example.university_managment_system.studentCourse;

import com.example.university_managment_system.CourseSections.CourseSection;
import com.example.university_managment_system.CourseSections.CourseSectionRepository;
import com.example.university_managment_system.major.Major;
import com.example.university_managment_system.student.Student;
import com.example.university_managment_system.student.StudentRepository;
import com.example.university_managment_system.teacher.Teacher;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentCourseCourseService {
    private final StudentCourseRepository studentCourseRepository;
    private final StudentRepository studentRepository;
    private final CourseSectionRepository courseSectionRepository;

    @Autowired
    public StudentCourseCourseService(StudentCourseRepository studentCourseRepository, StudentRepository studentRepository, CourseSectionRepository courseSectionRepository) {
        this.studentCourseRepository = studentCourseRepository;
        this.studentRepository = studentRepository;
        this.courseSectionRepository = courseSectionRepository;
    }

    public StudentCourse getStudentCourse(Long StudentCourseId) {
        return studentCourseRepository.findById(StudentCourseId).orElseThrow(() -> new IllegalStateException(
                "StudentCourse with id " + StudentCourseId + " does not exist"
        ));
    }

    public void addNewStudentCourse(StudentCourseRequest studentCourse) {
        Student student = studentRepository.findById(studentCourse.getStudent_id()).orElseThrow(() -> null);
        CourseSection courseSection = courseSectionRepository.findById(studentCourse.getSection_id()).orElseThrow(() -> null);

        StudentCourse newStudentCourse = new StudentCourse();
        newStudentCourse.setStudent(student);
        newStudentCourse.setSection(courseSection);
        newStudentCourse.setHomework(studentCourse.getHomework());
        newStudentCourse.setMidterm(studentCourse.getMidterm());
        newStudentCourse.setFinal_exam(studentCourse.getFinal_exam());
        newStudentCourse.setFinal_grade(studentCourse.getFinal_grade());
        newStudentCourse.setPassed(studentCourse.getPassed());
        newStudentCourse.setActive(studentCourse.getActive());
        newStudentCourse.setAccepted(studentCourse.getAccepted());

        studentCourseRepository.save(newStudentCourse);
    }

    public void deleteStudentCourse(Long StudentCourseId) {
        boolean exists = studentCourseRepository.existsById(StudentCourseId);
        if (!exists) {
            throw new IllegalStateException("StudentCourse with id " + StudentCourseId + " does not exist");
        }
        studentCourseRepository.deleteById(StudentCourseId);
    }

    @Transactional
    public void updateStudentCourse(Long StudentCourseId, StudentCourseRequest StudentCourse) {
        Student student = studentRepository.findById(StudentCourse.getStudent_id()).orElseThrow(() -> null);
        CourseSection courseSection = courseSectionRepository.findById(StudentCourse.getSection_id()).orElseThrow(() -> null);

        StudentCourse studentCourse = studentCourseRepository.findById(StudentCourseId)
                .orElseThrow(() -> new IllegalStateException(
                        "StudentCourse with id " + StudentCourseId + " does not exist"
                ));
        studentCourse.setStudent(student);
        studentCourse.setSection(courseSection);
        studentCourse.setHomework(StudentCourse.getHomework());
        studentCourse.setMidterm(StudentCourse.getMidterm());
        studentCourse.setFinal_exam(StudentCourse.getFinal_exam());
        studentCourse.setFinal_grade(StudentCourse.getFinal_grade());
        studentCourse.setPassed(StudentCourse.getPassed());
        studentCourse.setActive(StudentCourse.getActive());
        studentCourse.setAccepted(StudentCourse.getAccepted());

        studentCourseRepository.save(studentCourse);
    }
}




