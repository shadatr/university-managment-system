package com.example.university_managment_system.student;
import com.example.university_managment_system.major.Major;
import com.example.university_managment_system.studentCourse.StudentCourse;
import com.example.university_managment_system.teacher.Teacher;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "major_id", nullable = false)
    @JsonIgnore
    private Major major;
    private Integer semester;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "advisor", nullable = false)
    @JsonIgnore
    private Teacher advisor;
    private String password;
    @OneToMany(mappedBy = "courseSection", fetch = FetchType.EAGER)
    private List<StudentCourse> studentCourses;

    public Student() {
    }
    public Student(long id, String name, String surname, String email, Integer phone, LocalDate birth_date, String address, Major major, Integer semester, Teacher advisor, String password, List<StudentCourse> studentCourses) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.surname = surname;
        this.phone = phone;
        this.birth_date = birth_date;
        this.address = address;
        this.major = major;
        this.semester = semester;
        this.advisor = advisor;
        this.password = password;
        this.studentCourses = studentCourses;
    }

    public Student(String name, String surname, String email, Integer phone, LocalDate birth_date, String address, Major major, Integer semester, Teacher advisor, String password, List<StudentCourse> studentCourses) {
        this.name = name;
        this.email = email;
        this.surname = surname;
        this.phone = phone;
        this.birth_date = birth_date;
        this.address = address;
        this.major = major;
        this.semester = semester;
        this.advisor = advisor;
        this.password = password;
        this.studentCourses = studentCourses;
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
    public Major getMajor() {
        return this.major;
    }
    public void setMajor(Major major) {
        this.major = major;
    }
    public Integer getSemester() {
        return this.semester;
    }
    public void setSemester(Integer semester) {
        this.semester = semester;
    }
    public Teacher getAdvisor() {
        return this.advisor;
    }
    public void setAdvisor(Teacher advisor) {
        this.advisor = advisor;
    }
    public String getPassword() {
        return this.password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public List<StudentCourse> getStudentCourses() {
        return this.studentCourses;
    }
    public void setStudentCourses(List<StudentCourse> studentCourses) {
        this.studentCourses = studentCourses;
    }

    public String toString() {
        return "Student{id=" + id + ", name=" + name + ", surname=" + surname + ", email=" + email + ", phone=" + phone + ", birth_date=" + birth_date + ", address=" + address + ", major=" + major + ", semester=" + semester + ", advisor=" + advisor + "}";
    }
}
