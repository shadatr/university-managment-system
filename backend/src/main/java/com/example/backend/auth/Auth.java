package com.example.backend.auth;

import jakarta.persistence.*;

import java.time.LocalDate;


public class Auth {

    private String role;
    private long id;
    private String email;

    public Auth() {
    }

    public Auth(String role, long id, String email) {
        this.role = role;
        this.email = email;
        this.id = id;
    }
    public String getRole() {
        return this.role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public long getId() {
        return this.id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getEmail() {
        return this.email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

}
