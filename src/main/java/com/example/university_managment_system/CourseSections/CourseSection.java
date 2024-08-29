package com.example.university_managment_system.CourseSections;
import com.example.university_managment_system.courses.Course;
import com.example.university_managment_system.department.Department;
import com.example.university_managment_system.majorCourses.MajorCourses;
import com.example.university_managment_system.student.Student;
import com.example.university_managment_system.teacher.Teacher;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table
public class CourseSection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    @JsonIgnore
    private Course course;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    @JsonIgnore
    private Teacher teacher;
    private String semester;

    public CourseSection() {
    }
    public CourseSection(long id, String name, Course course, Teacher teacher, String semester) {
        this.id = id;
        this.name = name;
        this.course = course;
        this.teacher = teacher;
        this.semester = semester;
    }

    public CourseSection(String name, Course course, Teacher teacher, String semester) {
        this.name = name;
        this.course = course;
        this.teacher = teacher;
        this.semester = semester;
    }

    public long getId() {
        return this.id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getName() {
        return this.name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Course getCourse() {
        return this.course;
    }
    public void setCourse(Course course) {
        this.course = course;
    }
    public Teacher getTeacher() {
        return this.teacher;
    }
    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }
    public String getSemester() {
        return this.semester;
    }
    public void setSemester(String semester) {
        this.semester = semester;
    }

}
