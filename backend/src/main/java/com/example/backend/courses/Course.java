package com.example.backend.courses;
import com.example.backend.CourseSection.CourseSection;
import com.example.backend.majorCourses.MajorCourses;
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
    @OneToMany(mappedBy = "course", fetch = FetchType.EAGER)
    private List<CourseSection> courseSections;

    public Course() {
    }
    public Course(long id, String name, Integer credits, Integer hours, List<MajorCourses> majorCourses, List<CourseSection> courseSections) {
        this.id = id;
        this.name = name;
        this.credits = credits;
        this.hours = hours;
        this.majorCourses = majorCourses;
        this.courseSections = courseSections;
    }
    public Course(String name, Integer credits, Integer hours, List<MajorCourses> majorCourses, List<CourseSection> courseSections) {
        this.name = name;
        this.credits = credits;
        this.hours = hours;
        this.majorCourses = majorCourses;
        this.courseSections = courseSections;
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
    public List<CourseSection> getCourseSections() {
        return this.courseSections;
    }
}
