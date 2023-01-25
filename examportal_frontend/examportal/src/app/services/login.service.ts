import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginData } from '../classes/login-data';
import { User } from '../classes/user';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.apiBaseUrl;
  user:User = new User();
  public loginStatusSubject = new Subject<boolean>();


  constructor(private http:HttpClient) { }

  public getCurrentUser(){
    return this.http.get(`${this.baseUrl}/current-user`);
  }

  //generate token 
  public generateToken(loginData:LoginData){
    return this.http.post(`${this.baseUrl}/generate-token`, loginData)
  }

  //login user : set token in local storage
  public loginUser(token:string){
    localStorage.setItem("token", token);
    // this.loginStatusSubject.next(true);
    return true;
  }

  //check wheather login or not
  public isLoggedIn(){
   let token = localStorage.getItem("token");
   if(token == undefined || token == '' || token == null){
    return false;
   }else{
    return true;
   }
  }

  //logout
  public logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //get-Token on demand
  public getTokenOnDemand(){
    return localStorage.getItem("token");
  }

  //store user details in local storage
  public setUser(user:User){
    localStorage.setItem("user", JSON.stringify(user));
  }

  // getUser details
  public getUser(){
    let user = localStorage.getItem("user");
    if(user!=null){
      return JSON.parse(user);
    }
  }

  //get User role
  public getUserRole(){
    return this.getUser().authorities[0].authority;
  }

  //getUserfirstname
  public getUserFirstName(){
    return this.getUser().firstName;
  }


}
