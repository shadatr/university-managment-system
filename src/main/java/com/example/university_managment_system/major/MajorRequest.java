package com.example.university_managment_system.major;


public class MajorRequest {
    private String name;
    private Long department_id;
    private Integer credits;

    public MajorRequest() {
    }
    public MajorRequest(String name, Long department_id, Integer credits) {
        this.name = name;
        this.department_id = department_id;
        this.credits = credits;
    }

    public String getName() {
        return this.name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Long getDepartment_id() {
        return this.department_id;
    }
    public void setDepartment_id(Long department_id) {
        this.department_id = department_id;
    }
    public Integer getCredits() {
        return this.credits;
    }
    public void setCredits(Integer credits) {
        this.credits = credits;
    }
}