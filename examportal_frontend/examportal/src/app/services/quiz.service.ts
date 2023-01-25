import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../classes/category';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  //getting category list
  public getCategoryList():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/category/get-all-category`);
  }

  //getting category by id
  public getCategory(categoryId:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/category/get/${categoryId}`);
  }

  //deleting category by id
  public deleteCategory(id:any){
    return this.http.delete(`${this.baseUrl}/category/delete/${id}`);
  }

  //updating category
  public updateCategory(category:any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/category/update`,category);
  }

  //adding category
  public addCategory(category:Category):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/category/`, category);
  }

  //getting quiz list
  public getQuizList():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/quiz/get-all-quiz`);
  }

  //getting quiz list by categoryid
  public getQuizListByCategoryId(categoryId:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/quiz/get-quiz/${categoryId}`);
  }

  //getting active quiz by c id
  public getActiveQuizListByCategoryId(categoryId:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/quiz/get-active-quiz/${categoryId}`);
  }
  //getting all active quiz
  public getActiveQuizList():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/quiz/get-active-quiz`);
  }
  //adding quiz 
  public addQuiz(quiz:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/quiz/`, quiz);
  }
  //getting quiz by quiz id
  public getQuiz(quizId:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/quiz/get/${quizId}`)
  }

  //delete quiz
  public deleteQuiz(quizId:any):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/quiz/delete/${quizId}`);
  }
  //update quiz
  public updateQuiz(quiz:any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/quiz/update`,quiz);
  }
//activate quiz / incativate quiz
  public updateQuizStatus(quizId:any, status:any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/quiz/updateStatus/${quizId}`,status);
  }

  //get single question
  public getQuestion(questionId:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/question/get/${questionId}`);
  }
  //getting question list
  public getQuestionList(quizId:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/question/quiz/all/${quizId}`);
  }

  //getting limited question list
  public getLimitedQuestionList(quizId:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/question/quiz/${quizId}`);
  }




  //adding question in quiz
  public addQuestion(question:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/question/`,question);
  }

  //update question
  public updateQuestion(question:any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/question/update`,question);
  }

  //deleteing question
  public deleteQuestion(questionId:any):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/question/delete/${questionId}`);
  }

  //eval quiz
  public evalQuiz(questionList:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/question/eval-quiz`,questionList);
  }

}
