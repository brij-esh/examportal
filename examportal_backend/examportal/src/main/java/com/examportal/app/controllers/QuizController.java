package com.examportal.app.controllers;

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
import org.springframework.web.bind.annotation.RestController;

import com.examportal.app.entity.exam.Quiz;
import com.examportal.app.services.QuizService;


@RestController
@RequestMapping("/quiz")
@CrossOrigin("http://localhost:4200")
public class QuizController {
    @Autowired
    private QuizService quizService;

    //add 
    @PostMapping("/")
    public Quiz addQuiz(@RequestBody Quiz quiz){
        return this.quizService.addQuiz(quiz);
    }

    //update
    @PutMapping("/update")
    public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz){
        return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
    }


    //update
    @PutMapping("/updateStatus/{quizId}")
    public ResponseEntity<Quiz> updateQuizStatus(@PathVariable Long quizId, @RequestBody Boolean status){
        Quiz local = this.quizService.getQuiz(quizId);
        local.setActive(status);
        return ResponseEntity.ok(this.quizService.updateQuiz(local));
    }


    //get
    @GetMapping("/get-all-quiz")
    public ResponseEntity<?> getQuizzes(){
        return ResponseEntity.ok(this.quizService.getQuizes());
    }

    //get one quiz
    @GetMapping("/get/{quizId}")
    public ResponseEntity<?> getQuiz(@PathVariable("quizId") Long quizId){
        return ResponseEntity.ok(this.quizService.getQuiz(quizId));
    }
    //get quiz by categoryId
    @GetMapping("/get-quiz/{categoryId}")
    public ResponseEntity<?> getQuizByCategoryId(@PathVariable("categoryId") Long categoryId){
        return ResponseEntity.ok(this.quizService.getQuizByCategoryId(categoryId));

    }

    //get active quiz by categoryId
    @GetMapping("/get-active-quiz/{categoryId}")
    public ResponseEntity<?> getActiveQuizByCategoryId(@PathVariable("categoryId") Long categoryId){
        return ResponseEntity.ok(this.quizService.getActiveQuizByCategoryId(categoryId));

    }
     //get active quiz
     @GetMapping("/get-active-quiz")
     public ResponseEntity<?> getActiveQuizList(){
         return ResponseEntity.ok(this.quizService.getActiveQuizList());
 
     }

    //delete
    @DeleteMapping("/delete/{quizId}")
    public void deleteQuiz(@PathVariable("quizId") Long quizId){
        this.quizService.deleteQuiz(quizId);
        System.out.println("deleted");
    }
}
