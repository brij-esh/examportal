import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { LoginService } from 'src/app/services/login.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  
  user:User = new User();


  constructor(private loginService:LoginService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }

  public openUpdate(){
    this.router.navigate(['/update'])
  }


}
