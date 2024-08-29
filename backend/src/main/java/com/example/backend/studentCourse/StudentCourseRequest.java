package com.example.backend.studentCourse;

import com.example.backend.CourseSection.CourseSection;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class StudentCourseRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long section_id;
    private long student_id;
    private CourseSection section;
    private Integer homework;
    private Integer midterm;
    private Integer final_exam;
    private Integer final_grade;
    private boolean passed;
    private boolean active;
    private boolean accepted;

    public StudentCourseRequest() {
    }
    public StudentCourseRequest(long id, long section_id, long student_id, CourseSection section, Integer homework, Integer midterm, Integer final_exam, Integer final_grade, boolean passed, boolean active, boolean accepted) {
        this.id = id;
        this.section_id = section_id;
        this.student_id = student_id;
        this.section = section;
        this.homework = homework;
        this.midterm = midterm;
        this.final_exam = final_exam;
        this.final_grade = final_grade;
        this.passed = passed;
        this.active = active;
        this.accepted = accepted;
    }
    public StudentCourseRequest(long section_id, long student_id, CourseSection section, Integer homework, Integer midterm, Integer final_exam, Integer final_grade, boolean passed, boolean active, boolean accepted) {
        this.section_id = section_id;
        this.student_id = student_id;
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
    public long getSection_id() {
        return this.section_id;
    }
    public void setSection_id(long section_id) {
        this.section_id = section_id;
    }
    public long getStudent_id() {
        return this.student_id;
    }
    public void setStudent_id(long student_id) {
        this.student_id = student_id;
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
