package com.example.university_managment_system.student;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Table
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String surname;
    private String email;
    private Integer phone;
    private LocalDate birth_date;
    private String address;
    private Integer major_id;
    private Integer semester;
    private Integer advisor;
    private String password;

    public Student() {
    }
    public Student(long id, String name, String surname, String email, Integer phone, LocalDate birth_date, String address, Integer major_id, Integer semester, Integer advisor, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.surname = surname;
        this.phone = phone;
        this.birth_date = birth_date;
        this.address = address;
        this.major_id = major_id;
        this.semester = semester;
        this.advisor = advisor;
        this.password = password;
    }

    public Student(String name, String surname, String email, Integer phone, LocalDate birth_date, String address, Integer major_id, Integer semester, Integer advisor, String password) {
        this.name = name;
        this.email = email;
        this.surname = surname;
        this.phone = phone;
        this.birth_date = birth_date;
        this.address = address;
        this.major_id = major_id;
        this.semester = semester;
        this.advisor = advisor;
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
    public Integer getPhone() {
        return this.phone;
    }
    public void setPhone(Integer phone) {
        this.phone = phone;
    }
    public LocalDate getBirth_date() {
        return this.birth_date;
    }
    public void setBirth_date(LocalDate birth_date) {
        this.birth_date = birth_date;
    }
    public String getAddress() {
        return this.address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public Integer getMajor_id() {
        return this.major_id;
    }
    public void setMajor_id(Integer major_id) {
        this.major_id = major_id;
    }
    public Integer getSemester() {
        return this.semester;
    }
    public void setSemester(Integer semester) {
        this.semester = semester;
    }
    public Integer getAdvisor() {
        return this.advisor;
    }
    public void setAdvisor(Integer advisor) {
        this.advisor = advisor;
    }
    public String getPassword() {
        return this.password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String toString() {
        return "Student{id=" + id + ", name=" + name + ", surname=" + surname + ", email=" + email + ", phone=" + phone + ", birth_date=" + birth_date + ", address=" + address + ", major_id=" + major_id + ", semester=" + semester + ", advisor=" + advisor + "}";
    }
}
