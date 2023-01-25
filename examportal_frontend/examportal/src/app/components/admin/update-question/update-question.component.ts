import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/classes/question';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  constructor(private quizService:QuizService,
    private router:Router,
    private route:ActivatedRoute,

    ) { }
    questionId:any;
    quiz:any;
    public question:Question = new Question();


  ngOnInit(): void {
    this.questionId = this.route.snapshot.params['questionId'];
    this.getQuestion(this.questionId);
  }

  public getQuestion(questionId:any){
    this.quizService.getQuestion(questionId).subscribe(
      (data)=>{
        this.question = data;
      },
      (error)=>{
        Swal.fire('Error','Something went wrong!', 'error');
        console.log(error);
        
      }
    )
  }

  public updateQuestion(){
    console.log(this.question);
    
    this.quizService.updateQuestion(this.question).subscribe(
      (data)=>{
        Swal.fire('Success', this.question.content+' updated successfully', 'success');
        this.router.navigate(['/admin-dashboard/view-quiz-question/'+this.question.quiz.id+'/'+this.question.quiz.title])
      },
      (error)=>{
        Swal.fire('Failed',"Something went wrong!", 'error');
      }
    )
  }

}
