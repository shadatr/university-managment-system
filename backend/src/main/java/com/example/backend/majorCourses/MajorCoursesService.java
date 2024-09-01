package com.example.backend.majorCourses;

import com.example.backend.courses.Course;
import com.example.backend.courses.CourseRepository;
import com.example.backend.department.Department;
import com.example.backend.department.DepartmentRepository;
import com.example.backend.major.Major;
import com.example.backend.major.MajorRepository;
import com.example.backend.major.MajorRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class MajorCoursesService {
    private final MajorCoursesRepository majorCoursesRepository;
    private final CourseRepository courseRepository;
    private final MajorRepository majorRepository;

    @Autowired
    public MajorCoursesService(MajorCoursesRepository majorCoursesRepository, CourseRepository courseRepository, MajorRepository majorRepository) {
        this.majorCoursesRepository = majorCoursesRepository;
        this.courseRepository = courseRepository;
        this.majorRepository = majorRepository;
    }

    public MajorCourses getMajorCourse(Long MajorId) {
        return majorCoursesRepository.findById(MajorId).orElseThrow(() -> new IllegalStateException(
                "Major with id " + MajorId + " does not exist"
        ));
    }

    public List<MajorCourses> getMajorCourses(Long majorId) {
        return majorCoursesRepository.findMajorCourses(majorId);
    }

    public void addNewMajorCourse(@RequestBody MajorCoursesRequest majorRequest) {
        Course course= courseRepository.findById(majorRequest.getCourse_id()).orElseThrow(() -> null);
        Major major = majorRepository.findById(majorRequest.getMajor_id()).orElseThrow(() -> null);

        MajorCourses newMajorCourse = new MajorCourses();
        newMajorCourse.setMajor(major);
        newMajorCourse.setCourse(course);
        majorCoursesRepository.save(newMajorCourse);
    }

    public void deleteMajorCourse(Long majorCourseId) {
        boolean exists = majorCoursesRepository.existsById(majorCourseId);
        if (!exists) {
            throw new IllegalStateException("Major with id " + majorCourseId + " does not exist");
        }
        majorCoursesRepository.deleteById(majorCourseId);
    }

    @Transactional
    public void updateMajorCourse(Long MajorId, @RequestBody MajorCoursesRequest majorRequest) {

        MajorCourses existingMajorCourse = majorCoursesRepository.findById(MajorId).orElseThrow(() -> new RuntimeException("Major not found"));

        Major major = majorRepository.findById(majorRequest.getMajor_id()).orElseThrow(() -> null);
        Course course= courseRepository.findById(majorRequest.getCourse_id()).orElseThrow(() -> null);

        existingMajorCourse.setMajor(major);
        existingMajorCourse.setCourse(course);

        majorCoursesRepository.save(existingMajorCourse);
    }

}




