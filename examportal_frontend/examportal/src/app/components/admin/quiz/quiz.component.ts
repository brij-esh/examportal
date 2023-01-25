import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizzes=null;
  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.getQuizzes();
  }
  public getQuizzes(){
    this.quizService.getQuizList().subscribe(
      (data)=>{
        this.quizzes = data;
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error loading content!','Server down','error');
      }
    )
  }


  public deleteQuiz(quizId:any){
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
        this.quizService.deleteQuiz(quizId).subscribe(
          (data)=>{
            this.ngOnInit();
          },
        )
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your quiz has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your quiz is safe :)',
          'error'
        )
      }
    })
  }

  public activateQuiz(quizId:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "Your quiz will be activated!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Activate it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.quizService.updateQuizStatus(quizId, true).subscribe(
          (data)=>{
            this.ngOnInit();
          },
        )
        swalWithBootstrapButtons.fire(
          'Activated!',
          'Your quiz has been activated.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your quiz is inactive :)',
          'error'
        )
      }
    })
  }

  public deactivateQuiz(quizId:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "Your quiz will be deactivated!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Deactivate it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.quizService.updateQuizStatus(quizId, false).subscribe(
          (data)=>{
            this.ngOnInit();
          },
        )
        swalWithBootstrapButtons.fire(
          'Deactivated!',
          'Your quiz has been deactivated.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your quiz is active :)',
          'error'
        )
      }
    })
  }

}
