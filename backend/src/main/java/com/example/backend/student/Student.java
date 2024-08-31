package com.example.backend.student;
import com.example.backend.major.Major;
import com.example.backend.studentCourse.StudentCourse;
import com.example.backend.teacher.Teacher;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import com.example.backend.major.MajorRequest;
@Entity
@Table
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String surname;
    private String email;
    private long phone;
    private String birth_date;
    private String address;
    private String password;
    @ManyToOne(fetch = FetchType.EAGER) // Change to EAGER if needed
    @JoinColumn(name = "major_id", nullable = false)
    private Major major;
    private Integer semester;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "advisor_id", nullable = false)
    private Teacher advisor;
    @OneToMany(mappedBy = "student", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<StudentCourse> studentCourses;


    public Student() {
    }
    public Student(long id, String name, String surname, String email, long phone, String birth_date, String address, Major major, Integer semester, Teacher advisor, String password, List<StudentCourse> studentCourses) {
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

    public Student(String name, String surname, String email, long phone, String birth_date, String address, Major major, Integer semester, Teacher advisor, String password, List<StudentCourse> studentCourses) {
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
