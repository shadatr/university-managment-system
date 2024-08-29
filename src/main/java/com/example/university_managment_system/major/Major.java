package com.example.university_managment_system.major;
import com.example.university_managment_system.department.Department;
import jakarta.persistence.*;

@Entity
@Table
public class Major {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
    private Integer credits;
    public Major() {
    }
    public Major(long id, String name) {
        this.id = id;
        this.name = name;
    }
    public Major(String name) {
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
    public Department getDepartment() {
        return this.department;
    }
    public void setDepartment(Department department) {
        this.department = department;
    }
    public Integer getCredits() {
        return this.credits;
    }
    public void setCredits(Integer credits) {
        this.credits = credits;
    }
}
