import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/classes/category';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  constructor(private quizService:QuizService,
    private router:Router,
    private route:ActivatedRoute
    
    ) { }
    public category:Category = new Category();
    categoryId!:number;

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['categoryId'];
    this.getCategory(this.categoryId);
  }

  public getCategory(categoryId:any){
    this.quizService.getCategory(categoryId).subscribe(
    (data)=>{
      this.category = data;
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error','Error loading category!','error');
      
    }
    )
  }

  public updateCategory(){
    this.quizService.updateCategory(this.category).subscribe(
      (data)=>{
        Swal.fire('Updated',this.category.title+" updated successfully!", 'success');
        this.router.navigate(['/admin-dashboard/categories']);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Failed!','Something went wrong!','error');
      }
    )
  }

}
