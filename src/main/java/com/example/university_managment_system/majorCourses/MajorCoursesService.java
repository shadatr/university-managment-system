package com.example.university_managment_system.majorCourses;

import com.example.university_managment_system.courses.Course;
import com.example.university_managment_system.courses.CourseRepository;
import com.example.university_managment_system.department.Department;
import com.example.university_managment_system.department.DepartmentRepository;
import com.example.university_managment_system.major.Major;
import com.example.university_managment_system.major.MajorRepository;
import com.example.university_managment_system.major.MajorRequest;
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

    public void addNewMajorCourse(@RequestBody MajorCoursesRequest majorRequest) {
        Course course= courseRepository.findById(majorRequest.getCourse_id()).orElseThrow(() -> null);
        Major major = majorRepository.findById(majorRequest.getMajor_id()).orElseThrow(() -> null);

        MajorCourses newMajorCourse = new MajorCourses();
        newMajorCourse.setMajor(major);
        newMajorCourse.setCourse(course);
        majorCoursesRepository.save(newMajorCourse);
    }

    public void deleteMajorCourse(Long MajorId) {
        boolean exists = majorRepository.existsById(MajorId);
        if (!exists) {
            throw new IllegalStateException("Major with id " + MajorId + " does not exist");
        }
        majorRepository.deleteById(MajorId);
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




