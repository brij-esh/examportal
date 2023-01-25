import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/classes/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  categories=null;

  constructor(private quizService:QuizService,
    private router:Router,
    private route:ActivatedRoute
    ) { }
  public quiz:Quiz = new Quiz();
  quizId!:number;

  ngOnInit(): void {
    this.getCategory();
    this.quizId = this.route.snapshot.params['quizId'];
    this.getQuiz(this.quizId);
  }

  public getQuiz(quizId:any){
    this.quizService.getQuiz(quizId).subscribe(
      (data)=>{
        this.quiz = data;
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error', 'Error loading quiz content!', 'error');
      }
    )
  }

  public getCategory(){
    this.quizService.getCategoryList().subscribe(
      (data:any)=>{
        this.categories = data;
      },
      (error:any)=>{
        console.log(error);
        
      }
    )
  }

  public updateQuiz(){
    this.quizService.updateQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire('Updated',this.quiz.title+" updated successfully!", 'success');
        this.router.navigate(['/admin-dashboard/quiz']);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Failed!','Something went wrong!','error');
      }
    )
  }

}
