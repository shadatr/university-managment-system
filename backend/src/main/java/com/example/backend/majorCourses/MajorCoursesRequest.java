package com.example.backend.majorCourses;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class MajorCoursesRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Long course_id;
    private Long major_id;

    public MajorCoursesRequest() {
    }

    public MajorCoursesRequest(long id, Long course_id, Long major_id) {
        this.id = id;
        this.course_id = course_id;
        this.major_id = major_id;
    }

    public MajorCoursesRequest(Long course_id, Long major_id) {
        this.course_id = course_id;
        this.major_id = major_id;
    }

    public long getId() {
        return this.id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public Long getCourse_id() {
        return this.course_id;
    }
    public void setCourse_id(Long course_id) {
        this.course_id = course_id;
    }
    public Long getMajor_id() {
        return this.major_id;
    }
    public void setMajor_id(Long major_id) {
        this.major_id = major_id;
    }
}