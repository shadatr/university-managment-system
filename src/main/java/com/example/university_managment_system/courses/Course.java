package com.example.university_managment_system.courses;
import com.example.university_managment_system.department.Department;
import com.example.university_managment_system.majorCourses.MajorCourses;
import com.example.university_managment_system.student.Student;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private Integer credits;
    private Integer hours;
    @OneToMany(mappedBy = "course", fetch = FetchType.EAGER)
    private List<MajorCourses> majorCourses;

    public Course() {
    }
    public Course(long id, String name) {
        this.id = id;
        this.name = name;
    }
    public Course(String name) {
        this.name = name;
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
    public Integer getCredits() {
        return this.credits;
    }
    public void setCredits(Integer credits) {
        this.credits = credits;
    }
    public Integer getHours() {
        return this.hours;
    }
    public void setHours(Integer hours) {
        this.hours = hours;
    }
    public List<MajorCourses> getMajorCourses() {
        return this.majorCourses;
    }
    public void setMajorCourses(List<MajorCourses> majorCourses) {
        this.majorCourses = majorCourses;
    }
}
