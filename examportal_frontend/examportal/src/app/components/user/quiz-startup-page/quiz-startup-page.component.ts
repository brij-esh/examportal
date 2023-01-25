import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/classes/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-startup-page',
  templateUrl: './quiz-startup-page.component.html',
  styleUrls: ['./quiz-startup-page.component.css']
})
export class QuizStartupPageComponent implements OnInit {

  
  constructor(private quizService:QuizService,
    private router:Router,
    private route:ActivatedRoute
    ) { }
    quizId:any;
    public quiz:Quiz = new Quiz();
    
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.quizId = params['quizId'];
      this.getQuiz(this.quizId);
    })
  }
  

  public getQuiz(quizId:any){
    this.quizService.getQuiz(quizId).subscribe(
      (data)=>{
        this.quiz = data;
      },
      (error)=>{
        Swal.fire('Error', 'Error loading content!', 'error');
      }
    )
  }

  public startQuiz(quizId:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to stop this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Start it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result:any) => {
      if (result.isConfirmed) {
          this.router.navigate(['/quiz-start/'+quizId]);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'You can try again.:)',
          'error'
        )
      }
    })
  }

}
