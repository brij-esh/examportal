package com.examportal.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examportal.app.entity.exam.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long>{
    
}
