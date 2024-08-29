package com.example.university_managment_system.department;
import com.example.university_managment_system.major.Major;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @OneToMany(mappedBy = "department")
    private List<Major> majors;

    public Department() {
    }
    public Department(long id, String name) {
        this.id = id;
        this.name = name;
    }
    public Department(String name) {
        this.name = name;
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
    public List<Major> getMajors() {
        return this.majors;
    }
    public void setMajors(List<Major> majors) {
        this.majors = majors;
    }
}
