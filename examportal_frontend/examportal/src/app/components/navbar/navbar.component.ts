import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/classes/login-data';
import { User } from 'src/app/classes/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn=false;
  user:User | any = new User();

  constructor(public loginService: LoginService,
    private router:Router

    ) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.loginService.loginStatusSubject.asObservable().subscribe(
      (data)=>{
        this.user = this.loginService.getUser();
      }
    )
  }


  public goUserProfile(){
    if(this.user.authorities[0].authority=="ADMIN"){
      this.router.navigate(['/admin-dashboard']);
    }else{
      this.router.navigate(['/user-dashboard']);
    }
  }

  public logout(){
    this.user = new User();
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }

  


}
