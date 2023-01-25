import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/classes/question';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {


  constructor(private quizService:QuizService,
    private router:Router,
    private route:ActivatedRoute,

    ) { }
    quizId:any;
    quiz:any;
    public question:Question = new Question();


  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['quizId'];
    this.getQuiz();
  }

  public getQuiz(){
    this.quizService.getQuiz(this.quizId).subscribe(
      (data)=>{
        this.quiz = data;
      },
      (error)=>{
        Swal.fire('Error','Somrthing went wrong!', 'error');
        console.log(error);
        
      }
    )
  }

  public addQuestion(){
    this.question.quiz = this.quiz;
    this.quizService.addQuestion(this.question).subscribe(
      (data)=>{
        Swal.fire('Added', this.question.content+' added successfully', 'success');
        this.router.navigate(['/admin-dashboard/view-quiz-question/'+this.quizId+'/'+this.quiz.title])
      },
      (error)=>{
        Swal.fire('Failed',"Something went wront!", 'error');
      }
    )
  }

}
