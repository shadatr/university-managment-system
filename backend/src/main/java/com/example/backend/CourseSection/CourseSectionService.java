package com.example.backend.CourseSection;

import com.example.backend.courses.Course;
import com.example.backend.courses.CourseRepository;
import com.example.backend.teacher.Teacher;
import com.example.backend.teacher.TeacherRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class CourseSectionService {
    private final CourseSectionRepository CourseSectionRepository;
    private final CourseRepository courseRepository;
    private final TeacherRepository teacherRepository;

    @Autowired
    public CourseSectionService(CourseSectionRepository CourseSectionRepository, CourseRepository courseRepository, TeacherRepository teacherRepository) {
        this.CourseSectionRepository = CourseSectionRepository;
        this.courseRepository = courseRepository;
        this.teacherRepository = teacherRepository;
    }

    public List<CourseSection> getCourseSections() {
        return CourseSectionRepository.findAll();
    }

    public CourseSection getCourseSection(Long CourseSectionId) {
        return CourseSectionRepository.findById(CourseSectionId).orElseThrow(() -> new IllegalStateException(
                "CourseSection with id " + CourseSectionId + " does not exist"
        ));
    }

    public void addNewCourseSection(@RequestBody CourseSectionRequest CourseSectionRequest) {
        Course course = courseRepository.findById(CourseSectionRequest.getCourse_id()).orElseThrow(() -> null);
        Teacher teacher = teacherRepository.findById(CourseSectionRequest.getTeacher_id()).orElseThrow(() -> null);

        CourseSection CourseSection = new CourseSection();
        CourseSection.setName(CourseSectionRequest.getName());
        CourseSection.setCourse(course);
        CourseSection.setTeacher(teacher);
        CourseSection.setSemester(CourseSectionRequest.getSemester());
        CourseSectionRepository.save(CourseSection);

    }

    public void deleteCourseSection(Long CourseSectionId) {
        boolean exists = CourseSectionRepository.existsById(CourseSectionId);
        if (!exists) {
            throw new IllegalStateException("CourseSection with id " + CourseSectionId + " does not exist");
        }
        CourseSectionRepository.deleteById(CourseSectionId);
    }

    @Transactional
    public void updateCourseSection(Long CourseSectionId, @RequestBody CourseSectionRequest CourseSectionRequest) {
        CourseSection existingCourseSection = CourseSectionRepository.findById(CourseSectionId).orElseThrow(() -> new RuntimeException("CourseSection not found"));

        Course course = courseRepository.findById(CourseSectionRequest.getCourse_id()).orElseThrow(() -> null);
        Teacher teacher = teacherRepository.findById(CourseSectionRequest.getTeacher_id()).orElseThrow(() -> null);

        existingCourseSection.setName(CourseSectionRequest.getName());
        existingCourseSection.setCourse(course);
        existingCourseSection.setTeacher(teacher);
        existingCourseSection.setSemester(CourseSectionRequest.getSemester());

        CourseSectionRepository.save(existingCourseSection);
    }

}




