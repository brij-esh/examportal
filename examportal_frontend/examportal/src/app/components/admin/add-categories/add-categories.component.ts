import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/classes/category';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  public category:Category = new Category();
  constructor(private quizService:QuizService,
    private router:Router

    ) { }

  ngOnInit(): void {
  }

  public addCategory(){
    this.quizService.addCategory(this.category).subscribe(
      (data:any)=>{
        Swal.fire(
          'Success',
  'New Category '+`${data.title}`+' added successfully!',
  'success'
        )
        this.router.navigate(['/admin-dashboard/categories']);
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
