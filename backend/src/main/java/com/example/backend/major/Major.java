package com.example.backend.major;
import com.example.backend.department.Department;
import com.example.backend.majorCourses.MajorCourses;
import com.example.backend.student.Student;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table
public class Major {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
    private Integer credits;
    @OneToMany(mappedBy = "major", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Student> students;
    @OneToMany(mappedBy = "major", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<MajorCourses> majorCourses;

    public Major() {
    }
    public Major(long id, String name, Department department, Integer credits, List<Student> students, List<MajorCourses> majorCourses) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.credits = credits;
        this.students = students;
        this.majorCourses = majorCourses;
    }
    public Major(String name, Department department, Integer credits, List<Student> students, List<MajorCourses> majorCourses) {
        this.name = name;
        this.department = department;
        this.credits = credits;
        this.students = students;
        this.majorCourses = majorCourses;
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
    public Department getDepartment() {
        return this.department;
    }
    public void setDepartment(Department department) {
        this.department = department;
    }
    public Integer getCredits() {
        return this.credits;
    }
    public void setCredits(Integer credits) {
        this.credits = credits;
    }
    public List<Student> getStudents() {
        return this.students;
    }
    public void setStudents(List<Student> students) {
        this.students = students;
    }
    public List<MajorCourses> getMajorCourses() {
        return this.majorCourses;
    }
    public void setMajorCourses(List<MajorCourses> majorCourses) {
        this.majorCourses = majorCourses;
    }
}
