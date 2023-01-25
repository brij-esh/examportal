package com.examportal.app.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examportal.app.entity.exam.Question;
import com.examportal.app.entity.exam.Quiz;

public interface QuestionRepository extends JpaRepository<Question, Long>{

    public Set<Question> findByQuiz(Quiz quiz);
    
}
