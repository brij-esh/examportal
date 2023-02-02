import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/classes/question';
import { Quiz } from 'src/app/classes/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {


  quizId:any;
  public quiz:Quiz = new Quiz();
  public questionList:Question[]=[];

  timer:any;
  minute:any;
  seconds:any;
  totalTime:any;

  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;
  submit = false;

  constructor(private router:Router,
    private quizService:QuizService,
    private route:ActivatedRoute,
    private location:LocationStrategy
    ) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['quizId'];
    this.getLimitedQuestionList(this.quizId);
    this.preventBackButton();
    this.getQuiz(this.quizId);
  }

  
  
  public getLimitedQuestionList(quizId:any){
    this.quizService.getLimitedQuestionList(quizId).subscribe(
      (data)=>{
        this.questionList = data;
        this.timer = this.questionList.length*60;
        this.totalTime = this.timer;
        this.questionList.forEach((question)=>{
          question['givenAnswer'] = '';
        })
        this.startTimer();
        console.log(this.questionList);
      },
      (error)=>{
        Swal.fire('Error','Error loading content, Please try again.', 'error');
        this.router.navigate(['/user-dashboard/quiz-startup/'+quizId]);
      }
    )
  }

  public startTimer(){
    this.minute = this.timer/60;
    this.seconds = 0;
    let t = window.setInterval(()=>{
      if(this.seconds==0){
        this.seconds=60;
        this.minute--;
      }
      this.timer--;
      this.seconds--;
        if(this.timer<=0){
          this.autoSubmitQuiz();
          clearInterval(t);
        }
      },1000);
  }

  public getQuiz(quizId:any){
    this.quizService.getQuiz(quizId).subscribe(
      (data)=>{
        this.quiz = data;
      },
      (error)=>{
        Swal.fire('Error','Error loading content', 'error');
        this.router.navigate(['/user-dashboard/quiz-startup/'+quizId]);
      }
    )
  }

  public submitQuiz(){
    Swal.fire({
      title:'Do you want to submit the quiz?',
      showCancelButton:true,
      confirmButtonText:'Submit',
      icon:'info',
    }).then((e)=>{
      if(e.isConfirmed){
        this.submit = true;
        this.submitQuizOnServer();
      }
    })
  }
  public autoSubmitQuiz(){
        this.submit = true;
        this.submitQuizOnServer();
  }
  public submitQuizOnServer(){
    this.quizService.evalQuiz(this.questionList).subscribe(
      (data)=>{
        this.attempted = data.attempted;
        this.correctAnswer = data.correctAnswer;
        this.marksGot = data.marksGot;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  public printPage(){
    window.print();
  }

  preventBackButton(){
    history.pushState(null, '', location.href);
    this.location.onPopState(()=>{
      history.pushState(null, '', location.href);
    });
  }

}
