package com.examportal.app.services.serviceImpl;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.examportal.app.entity.exam.Quiz;
import com.examportal.app.repository.QuizRepository;
import com.examportal.app.services.QuizService;

@Service
public class QuizServiceImpl  implements QuizService{

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public Quiz addQuiz(Quiz quiz) {
       return this.quizRepository.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    @Override
    public Set<Quiz> getQuizes() {
       return new LinkedHashSet<>(this.quizRepository.findAll());
    }

    @Override
    public Quiz getQuiz(Long id) {
        Optional<Quiz> value = this.quizRepository.findById(id);
        if(!value.isEmpty()){
            return value.get();
        }
       return null;
    }

    @Override
    @Transactional
    public void deleteQuiz(Long id) {
        Quiz quiz = this.quizRepository.findById(id).get();
        this.quizRepository.deleteById(id);
        this.quizRepository.delete(quiz);
    }

    @Override
    public Set<Quiz> getQuizByCategoryId(Long categoryId) {
        List<Quiz> quizzes =  this.quizRepository.findAll();
        Set<Quiz> ans =  quizzes.stream().filter(s->s.getCategory().getId().equals(categoryId)).collect(Collectors.toSet());
        System.out.println(ans);
        return ans;
    }

    @Override
    public Set<Quiz> getActiveQuizByCategoryId(Long categoryId) {
        List<Quiz> quizzes =  this.quizRepository.findAll();
        Set<Quiz> ans =  quizzes.stream().filter(s->s.getCategory().getId().equals(categoryId) && s.getActive()).collect(Collectors.toSet());
        System.out.println(ans);
        return ans;
    }
    @Override
    public Set<Quiz> getActiveQuizList() {
        List<Quiz> quizzes =  this.quizRepository.findAll();
        Set<Quiz> ans =  quizzes.stream().filter(s->s.getActive()).collect(Collectors.toSet());
        System.out.println(ans);
        return ans;
    }
    
    
}
