package com.examportal.app.services;

import java.util.Set;

import com.examportal.app.entity.exam.Quiz;

public interface QuizService {
    //add quiz
    public Quiz addQuiz(Quiz quiz);

    //update
    public Quiz updateQuiz(Quiz quiz);

    //get all quiz
    public Set<Quiz> getQuizes();

    //get single quiz
    public Quiz getQuiz(Long id);

    //getting quiz by categoryId
    public Set<Quiz> getQuizByCategoryId(Long categoryId);

    //getting only active quizzes
    public Set<Quiz> getActiveQuizByCategoryId(Long categoryId);

     //getting only active quizzes
    public Set<Quiz> getActiveQuizList();

    //delete quiz
    public void deleteQuiz(Long id);


}
