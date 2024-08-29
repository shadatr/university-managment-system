package com.example.backend.teacher;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    @Query("SELECT s FROM Teacher s WHERE s.email = ?1")
    Optional<Teacher> findTeacherByEmail(String email);
}
