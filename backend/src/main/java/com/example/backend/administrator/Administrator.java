package com.example.backend.administrator;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table
public class Administrator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String surname;
    private String email;
    private Integer phone;
    private LocalDate birth_date;
    private String address;
    private  String password;

    public Administrator() {
    }
    public Administrator(long id, String name, String surname, String email, Integer phone, LocalDate birth_date, String address, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.surname = surname;
        this.phone = phone;
        this.birth_date = birth_date;
        this.address = address;
        this.password = password;
    }

    public Administrator(String name, String surname, String email, Integer phone, LocalDate birth_date, String address, String password) {
        this.name = name;
        this.email = email;
        this.surname = surname;
        this.phone = phone;
        this.birth_date = birth_date;
        this.address = address;
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
    public String getPassword() {
        return this.password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String toString() {
        return "administrator{id=" + id + ", name=" + name + ", email=" + email + ", surname=" + surname + ", phone=" + phone + ", birth_date=" + birth_date + ", address=" + address + "}";
    }
}
