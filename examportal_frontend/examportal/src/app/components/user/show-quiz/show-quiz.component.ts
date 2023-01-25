import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-quiz',
  templateUrl: './show-quiz.component.html',
  styleUrls: ['./show-quiz.component.css']
})
export class ShowQuizComponent implements OnInit {
  categoryId:any;
  quizListByCategoryId:any=[];
  categoryTitle:any;

  constructor(private quizService:QuizService,
    private router:Router,
    private route:ActivatedRoute

    ) { }


  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.categoryId = params['categoryId'];
      this.categoryTitle = params['categoryTitle'];
      this.getActiveQuizListByCategoryId(this.categoryId);
    })
  }


  public getQuizListByCategoryId(categoryId:any){
    this.quizService.getQuizListByCategoryId(categoryId).subscribe(
      (data)=>{
        this.quizListByCategoryId = data;
      },
      (error)=>{
        Swal.fire('Error','Error loading content!','error');
      }
    )
  }
  public getActiveQuizListByCategoryId(categoryId:any){
    this.quizService.getActiveQuizListByCategoryId(categoryId).subscribe(
      (data)=>{
        this.quizListByCategoryId = data;
      },
      (error)=>{
        Swal.fire('Error','Error loading content!','error');
      }
    )
  }


}
