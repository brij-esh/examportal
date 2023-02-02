package com.examportal.app.controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.examportal.app.entity.exam.Question;
import com.examportal.app.entity.exam.Quiz;
import com.examportal.app.services.QuestionService;
import com.examportal.app.services.QuizService;


@RestController
@RequestMapping("/question")
@CrossOrigin("http://localhost:4200")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    //add
    @PostMapping("/")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    //update
    @PutMapping("/update")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    //get all Question
    @GetMapping("/get-all-questions")
    public ResponseEntity<Set<Question>> getAllQuestion(){
        return ResponseEntity.ok(this.questionService.getAllQuestions());
    }

    //get question
    @GetMapping("/get/{questionId}")
    public Question getQuestion(@PathVariable("questionId") Long questionId){
        return this.questionService.getQuestion(questionId);
    }

    //limited question of any quiz
    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<Set<Question>> getQuestionOfQuiz(@PathVariable("quizId") Long quizId){
        Quiz quiz = this.quizService.getQuiz(quizId);
        List<Question> questionList =  quiz.getQuestions().stream().collect(Collectors.toList());
        Collections.shuffle(questionList);
        questionList.forEach(question->{
            question.setAnswer("");
        });
        Set<Question> questions =  questionList.stream().limit(quiz.getNumberOfQuestion()).collect(Collectors.toSet());
        return ResponseEntity.ok(questions);
    }
    //all question of any quiz
    @GetMapping("/quiz/all/{quizId}")
    public ResponseEntity<Set<Question>> getQuestionOfQuizAdmin(@PathVariable("quizId") Long quizId){
        Quiz quiz = this.quizService.getQuiz(quizId);
        Set<Question> questions =  quiz.getQuestions().stream().collect(Collectors.toSet());
        return ResponseEntity.ok(questions);
    }

    //deleteQuestion
    @DeleteMapping("/delete/{questionId}")
    public void deleteQuestion(@PathVariable("questionId") Long questionId){
        this.questionService.deleteQuestion(questionId);
    }

    //eval quiz
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evaluateQuiz(@RequestBody List<Question> questions){
        System.out.println(questions);
        Long marksGot = 0l;
        Long correctAnswer = 0l;
        Long attempted = 0l;
        Long markPerQuestion = questions.get(0).getQuiz().getMaxMarks() / questions.get(0).getQuiz().getNumberOfQuestion();
        for(Question q:questions){
            Question question = this.questionService.getQuestion(q.getId());
            if(question.getAnswer().trim().equals(q.getGivenAnswer().trim())){
                correctAnswer++;
                marksGot+=markPerQuestion;
            }
            if(q.getGivenAnswer().length()!=0 ){
                attempted++;
            }

        }
        Map<Object, Object> map = Map.of("marksGot",marksGot, "correctAnswer",correctAnswer,"attempted",attempted);
        return ResponseEntity.ok(map);
    }
}
