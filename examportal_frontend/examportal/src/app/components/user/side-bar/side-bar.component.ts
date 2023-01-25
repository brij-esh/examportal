import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  categories:any=[];
  quizzes:any=[];
  showQuiz=false;
  showCategory=false;

  refresh:boolean= false;

  constructor(private loginService:LoginService,
    private router:Router,
    private quizService:QuizService
    ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getQuizzes();
  }

  public openCategory(categoryId:any, categoryTitle:any){
    this.router.navigate(['/user-dashboard/quiz/'+categoryId+'/'+categoryTitle]);
    this.refresh = true;
  }

  public isQuizShown(){
    if(!this.showQuiz){
      this.showQuiz = true;
    }else{
      this.showQuiz = false;
    }
  }
  public isCategoryShown(){
    if(!this.showCategory){
      this.showCategory = true;
    }else{
      this.showCategory = false;
    }
  }

  public getCategories(){
    this.quizService.getCategoryList().subscribe(
      (data)=>{
        this.categories = data;
      },
      (error)=>{
        Swal.fire('Error','Error loading content!','error');
      }
    )
  }
  public getQuizzes(){
    this.quizService.getActiveQuizList().subscribe(
      (data)=>{
        this.quizzes = data;
      },
      (error)=>{
        Swal.fire('Error','Error loading content!','error');
      }
    )
  }

  public logout(){
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }

}
