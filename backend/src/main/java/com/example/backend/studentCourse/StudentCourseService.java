package com.example.backend.studentCourse;

import com.example.backend.CourseSection.CourseSection;
import com.example.backend.CourseSection.CourseSectionRepository;
import com.example.backend.student.Student;
import com.example.backend.student.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class StudentCourseService {
    private final StudentCourseRepository studentCourseRepository;
    private final StudentRepository studentRepository;
    private final CourseSectionRepository courseSectionRepository;

    @Autowired
    public StudentCourseService(StudentCourseRepository studentCourseRepository, StudentRepository studentRepository, CourseSectionRepository courseSectionRepository) {
        this.studentCourseRepository = studentCourseRepository;
        this.studentRepository = studentRepository;
        this.courseSectionRepository = courseSectionRepository;
    }

    public StudentCourse getStudentCourse(Long StudentCourseId) {
        return studentCourseRepository.findById(StudentCourseId).orElseThrow(() -> new IllegalStateException(
                "StudentCourse with id " + StudentCourseId + " does not exist"
        ));
    }

    public List<StudentCourse> activeStudentCourses(Long StudentId) {
        List<StudentCourse> studentCourses = studentCourseRepository.findCoursesByStudent(StudentId);
        List<StudentCourse> activeStudentCourses = studentCourses.stream().filter(studentCourse -> studentCourse.getActive()==true).toList();
        return activeStudentCourses;
    }

    public List<StudentCourse> getSectionStudents(Long sectionId) {
        return studentCourseRepository.findSectionStudents(sectionId);}

    public void addNewStudentCourse(StudentCourseRequest studentCourse) {
        Student student = studentRepository.findById(studentCourse.getStudent_id()).orElseThrow(() -> null);
        CourseSection courseSection = courseSectionRepository.findById(studentCourse.getSection_id()).orElseThrow(() -> null);
        Optional<StudentCourse> studentCourseOptional = studentCourseRepository.findStudentCourse(studentCourse.getStudent_id(), studentCourse.getSection_id());
        if (studentCourseOptional.isPresent()) {
            throw new IllegalStateException("Course already added to student");
        }
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




