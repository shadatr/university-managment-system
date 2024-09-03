package com.example.backend.administrator;

import com.example.backend.teacher.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Long> {
    @Query("SELECT s FROM Administrator s WHERE s.email = ?1")
    Optional<Administrator> findAdministratorByEmail(String email);
    @Query("SELECT s FROM Administrator s WHERE s.email = ?1 AND s.password = ?2")
    Administrator findAdministratorByEmailAndPassword(String email, String password);
}
