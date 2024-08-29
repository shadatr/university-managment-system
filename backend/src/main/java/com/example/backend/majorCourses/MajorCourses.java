package com.example.backend.majorCourses;
import com.example.backend.courses.Course;
import com.example.backend.department.Department;
import com.example.backend.major.Major;
import com.example.backend.student.Student;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table
public class MajorCourses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "major_id", nullable = false)
    @JsonIgnore
    private Major major;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    @JsonIgnore
    private Course course;

    public MajorCourses() {
    }
    public MajorCourses(long id, Major major, Course course) {
        this.id = id;
        this.major = major;
    }
    public MajorCourses(Major major, Course course) {
        this.major = major;
        this.course = course;
    }

    public long getId() {
        return this.id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public Major getMajor() {
        return this.major;
    }
    public void setMajor(Major major) {
        this.major = major;
    }
    public Course getCourse() {
        return this.course;
    }
    public void setCourse(Course course) {
        this.course = course;
    }
}
