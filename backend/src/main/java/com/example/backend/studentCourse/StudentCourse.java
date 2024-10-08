package com.example.backend.studentCourse;


import com.example.backend.CourseSection.CourseSection;
import com.example.backend.student.Student;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "student_courses")
public class StudentCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "section_id", nullable = false)
    private CourseSection section;
    private Integer homework;
    private Integer midterm;
    private Integer final_exam;
    private Integer final_grade;
    private boolean passed;
    private boolean active;
    private boolean accepted;

    public StudentCourse() {
    }

    public StudentCourse(long id, Student student, CourseSection section, Integer homework, Integer midterm, Integer final_exam, Integer final_grade, boolean passed, boolean active, boolean accepted) {
        this.id = id;
        this.student = student;
        this.section = section;
        this.homework = homework;
        this.midterm = midterm;
        this.final_exam = final_exam;
        this.final_grade = final_grade;
        this.passed = passed;
        this.active = active;
        this.accepted = accepted;

    }

    public StudentCourse(Student student, CourseSection section, Integer homework, Integer midterm, Integer final_exam, Integer final_grade, boolean passed, boolean active, boolean accepted) {
        this.student = student;
        this.section = section;
        this.homework = homework;
        this.midterm = midterm;
        this.final_exam = final_exam;
        this.final_grade = final_grade;
        this.passed = passed;
        this.active = active;
        this.accepted = accepted;
    }

    public long getId() {
        return this.id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public Student getStudent() {
        return this.student;
    }
    public void setStudent(Student student) {
        this.student = student;
    }
    public CourseSection getSection() {
        return this.section;
    }
    public void setSection(CourseSection section) {
        this.section = section;
    }
    public Integer getHomework() {
        return this.homework;
    }
    public void setHomework(Integer homework) {
        this.homework = homework;
    }
    public Integer getMidterm() {
        return this.midterm;
    }
    public void setMidterm(Integer midterm) {
        this.midterm = midterm;
    }
    public Integer getFinal_exam() {
        return this.final_exam;
    }
    public void setFinal_exam(Integer final_exam) {
        this.final_exam = final_exam;
    }
    public Integer getFinal_grade() {
        return this.final_grade;
    }
    public void setFinal_grade(Integer final_grade) {
        this.final_grade = final_grade;
    }

    public boolean getPassed() {
        return this.passed;
    }
    public void setPassed(boolean passed) {
        this.passed = passed;
    }
    public boolean getActive() {
        return this.active;
    }
    public void setActive(boolean active) {
        this.active = active;
    }
    public boolean getAccepted() {
        return this.accepted;
    }
    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

}
