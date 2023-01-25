import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/classes/login-data';
import { User } from 'src/app/classes/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();
  loginData:LoginData = new LoginData();

  constructor(private userService:UserService,
    private snakBar:MatSnackBar,
    private loginService:LoginService,
    private route:Router
    ) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.loginData);
    //request server to login
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log(data);
        console.log("success!");

        //login..........
        this.loginService.loginUser(data.token);

        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
            console.log(user);
            this.loginService.setUser(user);
            //redirect to user role specific page
            if(this.loginService.getUserRole()=="ADMIN"){
              //go to admin dashboard
              this.route.navigate(['admin-dashboard']);
              this.loginService.loginStatusSubject.next(true);
              this.snakBar.open("Successfully Logged in!",'ok!',{
                duration:3000,
              })
            }else if(this.loginService.getUserRole()=="NORMAL"){
              //go to normal user dashboard
              this.route.navigate(['user-dashboard']);
              this.loginService.loginStatusSubject.next(true);
              this.snakBar.open("Successfully Logged in!",'ok!',{
                duration:3000,
              })
            }else{
              this.loginService.logOut();
            }


          },
          (error)=>{
            console.log(error);
            this.snakBar.open("Invalid details!! Try Again",'ok',{
              duration:3000,
            })
          }
        );
      },
      (error)=>{
        console.log(error);
        console.log("error generated!");
        this.snakBar.open("Invalid details!! Try Again",'ok',{
          duration:3000,
        })
      }
    )
  }

}
