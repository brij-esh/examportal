import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user:User = new User();
  constructor(private userService:UserService,
    private router:Router
    ) { }



  ngOnInit(): void {
  }

  register(){
    console.log(this.user);
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        Swal.fire('Success', 'Registered Successfully!', 'success');
        this.router.navigate(['/login']);
      },
      (error)=>{
        Swal.fire('Failed','Something went wrong', 'error');
      }
    )
  }

}
