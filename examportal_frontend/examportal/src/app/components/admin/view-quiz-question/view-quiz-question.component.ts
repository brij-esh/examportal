import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/classes/question';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit {

  constructor(private quizService:QuizService,
    private router:Router,
    private route:ActivatedRoute
    ) { }
    public question:Question = new Question();
    questionList:any=[];
    quizList:any=[];

    quizId!:number;
    quizTitle!:string;

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['quizId'];
    this.quizTitle = this.route.snapshot.params['title'];
    this.getQuizList();
    this.getQuestionList(this.quizId);
  }


  public getQuizList(){
    this.quizService.getQuizList().subscribe(
      (data)=>{
        this.quizList = data;
      },
      (error)=>{
        Swal.fire('Error','Error loading quiz list!', 'error');
      }
    )
  }
  public getQuestionList(quizId:any){
    this.quizService.getQuestionList(quizId).subscribe(
      (data)=>{
        this.questionList = data;
      },
      (error)=>{
        Swal.fire('Error','Error loading quiz list!', 'error');
      }
    )
  }

  public deleteQuestion(questionId:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuestion(questionId).subscribe(
          (data)=>{
            this.ngOnInit();
          },
        )
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your question has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your question is safe :)',
          'error'
        )
      }
    })
  }

}
