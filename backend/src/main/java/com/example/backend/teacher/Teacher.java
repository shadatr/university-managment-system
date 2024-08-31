package com.example.backend.teacher;
import com.example.backend.CourseSection.CourseSection;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String surname;
    private String email;
    private long phone;
    private String birth_date;
    private String address;
    private String major;
    private String Department;
    private String password;
    @OneToMany(mappedBy = "teacher", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<CourseSection> courseSections;

    public Teacher() {
    }
    public Teacher(long id, String name, String surname, String email, long phone, String birth_date, String address, String major, String Department, String password, List<CourseSection> courseSections) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.surname = surname;
        this.phone = phone;
        this.birth_date = birth_date;
        this.address = address;
        this.major= major;
        this.Department = Department;
        this.password = password;
        this.courseSections = courseSections;
    }

    public Teacher(String name, String surname, String email, long phone, String birth_date, String address, String major, String Department, String password, List<CourseSection> courseSections) {
        this.name = name;
        this.email = email;
        this.surname = surname;
        this.phone = phone;
        this.birth_date = birth_date;
        this.address = address;
        this.major= major;
        this.Department = Department;
        this.password = password;
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
    public String getMajor() {
        return this.major;
    }
    public void setMajor(String major) {
        this.major = major;
    }
    public String getDepartment() {
        return this.Department;
    }
    public void setDepartment(String Department) {
        this.Department = Department;
    }
    public String getPassword() {
        return this.password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public List<CourseSection> getCourseSections() {
        return this.courseSections;
    }
    public void setCourseSections(List<CourseSection> courseSections) {
        this.courseSections = courseSections;
    }


    public String toString() {
        return "Teacher{id=" + id + ", name=" + name + ", email=" + email + ", surname=" + surname + ", phone=" + phone + ", birth_date=" + birth_date + ", address=" + address + ", major=" + major + ", Department=" + Department + "}";
    }
}
