import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../classes/user';
import { UserData } from '../classes/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient, ) { }

  //add user
  public addUser(user:User){
    return this.http.post(`${this.baseUrl}/user/`,user);
  }

  //check user existence
  public checkUserExist(username:any){
    return this.http.get(`${this.baseUrl}/user/check/`,username);
  }

  //update user
  public updateUser(userData:UserData){
    return this.http.put(`${this.baseUrl}/user/update-user`,userData);
  }
  
}
