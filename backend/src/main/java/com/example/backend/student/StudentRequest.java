package com.example.backend.student;
import jakarta.persistence.*;

import java.time.LocalDate;

public class StudentRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String surname;
    private String email;
    private long phone;
    private String birth_date;
    private String address;
    private Long major_id;
    private Integer semester;
    private Long advisor_id;
    private String password;

    public StudentRequest() {
    }

    public StudentRequest(long id, String name, String surname, String email, long phone, String birth_date, String address, Long major_id, Integer semester, Long advisor_id, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.surname = surname;
        this.phone = phone;
        this.birth_date = birth_date;
        this.address = address;
        this.major_id = major_id;
        this.semester = semester;
        this.advisor_id = advisor_id;
        this.password = password;
    }

    public StudentRequest(String name, String surname, String email, long phone, String birth_date, String address, Long major_id, Integer semester, Long advisor_id, String password) {
        this.name = name;
        this.email = email;
        this.surname = surname;
        this.phone = phone;
        this.birth_date = birth_date;
        this.address = address;
        this.major_id = major_id;
        this.semester = semester;
        this.advisor_id = advisor_id;
        this.password = password;
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
    public String getSurname() {
        return this.surname;
    }
    public void setSurname(String surname) {
        this.surname = surname;
    }
    public String getEmail() {
        return this.email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public long getPhone() {
        return this.phone;
    }
    public void setPhone(long phone) {
        this.phone = phone;
    }
    public String getBirth_date() {
        return this.birth_date;
    }
    public void setBirth_date(String birth_date) {
        this.birth_date = birth_date;
    }
    public String getAddress() {
        return this.address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public Long getMajor_id() {
        return this.major_id;
    }
    public void setMajor_id(Long major_id) {
        this.major_id = major_id;
    }
    public Integer getSemester() {
        return this.semester;
    }
    public void setSemester(Integer semester) {
        this.semester = semester;
    }
    public Long getAdvisor_id() {
        return this.advisor_id;
    }
    public void setAdvisor_id(Long advisor_id) {
        this.advisor_id = advisor_id;
    }
    public String getPassword() {
        return this.password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
