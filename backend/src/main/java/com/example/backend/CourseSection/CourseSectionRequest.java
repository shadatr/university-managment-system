package com.example.backend.CourseSection;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class CourseSectionRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private Long teacher_id;
    private Long course_id;
    private String semester;

    public CourseSectionRequest() {
    }
    public CourseSectionRequest(long id, String name, Long teacher_id, Long course_id, String semester) {
        this.id = id;
        this.name = name;
        this.teacher_id = teacher_id;
        this.course_id = course_id;
        this.semester = semester;
    }
    public CourseSectionRequest(String name, Long teacher_id, Long course_id, String semester) {
        this.name = name;
        this.teacher_id = teacher_id;
        this.course_id = course_id;
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
    public Long getTeacher_id() {
        return this.teacher_id;
    }
    public void setTeacher_id(Long teacher_id) {
        this.teacher_id = teacher_id;
    }
    public Long getCourse_id() {
        return this.course_id;
    }
    public void setCourse_id(Long course_id) {
        this.course_id = course_id;
    }
    public String getSemester() {
        return this.semester;
    }
    public void setSemester(String semester) {
        this.semester = semester;
    }

}