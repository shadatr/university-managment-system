package com.example.backend.auth;
class AuthRequest {
    private String role;
    private String password;
    private String email;

    public AuthRequest() {
    }

    public AuthRequest(String role, String password, String email) {
        this.role = role;
        this.password = password;
        this.email = email;
    }
    public String getRole() {
        return this.role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getPassword() {
        return this.password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmail() {
        return this.email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

}