import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-categories',
  templateUrl: './exam-categories.component.html',
  styleUrls: ['./exam-categories.component.css']
})
export class ExamCategoriesComponent implements OnInit {


  categories:any;
  constructor(private quizService:QuizService,
    ) { }

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
        Swal.fire("Error","Error loading content",'error');
        
      }
    )
  }

  public updateCategory(id:any){

  }

  public deleteCategory(id:any){
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
        this.quizService.deleteCategory(id).subscribe(
          (data)=>{
            this.ngOnInit();
          },
        )
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your category has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your category is safe :)',
          'error'
        )
      }
    })
  }


}
