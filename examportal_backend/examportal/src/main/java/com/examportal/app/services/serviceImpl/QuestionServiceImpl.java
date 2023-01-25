package com.examportal.app.services.serviceImpl;

import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examportal.app.entity.exam.Question;
import com.examportal.app.entity.exam.Quiz;
import com.examportal.app.repository.QuestionRepository;
import com.examportal.app.services.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question addQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public Set<Question> getAllQuestions() {
       return new LinkedHashSet<>(this.questionRepository.findAll());
    }

    @Override
    public Question getQuestion(Long id) {
       Optional<Question> value = this.questionRepository.findById(id);
       if(!value.isEmpty()){
        return value.get();
       }
       return null;
    }

    @Override
    public void deleteQuestion(Long id) {
        this.questionRepository.deleteById(id);
    }

    @Override
    public Set<Question> getQuestionOfQuiz(Quiz quiz) {
        return new LinkedHashSet<>(this.questionRepository.findByQuiz(quiz));
    }


    //eval quiz
    
}
