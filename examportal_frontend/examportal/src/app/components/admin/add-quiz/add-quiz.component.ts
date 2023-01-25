import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/classes/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories=null;

  constructor(private quizService:QuizService,
    private router:Router
    ) { }
  public quiz:Quiz = new Quiz();

  ngOnInit(): void {
    this.getCategory();
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

  public addQuiz(){
    this.quizService.addQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire(
          'Success',
  'New Quiz '+`${data.title}`+' added successfully!',
  'success'
        )
        this.router.navigate(['/admin-dashboard/quiz']);
      },
      (error:any)=>{
        Swal.fire(
          'Failed',
  'Something went wrong!',
  'error'
        )
      }
    )
  }


}
