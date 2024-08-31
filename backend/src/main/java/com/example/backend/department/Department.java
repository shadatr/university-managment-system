package com.example.backend.department;
import com.example.backend.major.Major;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @OneToMany(mappedBy = "department", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Major> majors;

    public Department() {
    }
    public Department(long id, String name, List<Major> majors) {
        this.id = id;
        this.name = name;
        this.majors = majors;
    }
    public Department(String name, List<Major> majors) {
        this.name = name;
        this.majors = majors;
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
