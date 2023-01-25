package com.examportal.app.services;

import java.util.Set;

import com.examportal.app.entity.exam.Question;
import com.examportal.app.entity.exam.Quiz;

public interface QuestionService {
    //add
    public Question addQuestion(Question question);

    //update
    public Question updateQuestion(Question question);

    //get all question
    public Set<Question> getAllQuestions();

    //get question
    public Question getQuestion(Long id);

    //delete question
    public void deleteQuestion(Long id);

    //get Question of quiz
    public Set<Question> getQuestionOfQuiz(Quiz quiz);

}
