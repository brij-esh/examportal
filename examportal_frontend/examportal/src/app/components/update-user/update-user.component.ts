import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserData } from 'src/app/classes/user-data';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userData:UserData = new UserData();
  user:User = new User();
  constructor(private loginService:LoginService,
    private userService:UserService
    ) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.userData.email = this.user.email;
    this.userData.firstName = this.user.firstName;
    this.userData.lastName = this.user.lastName;
    this.userData.password = this.user.password;
    this.userData.phone = this.user.phone;
  }
  

  public update(userData:UserData){
    this.userService.updateUser(userData).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire("Updated","User updated successfully!","success");
      },
      (error)=>{
        console.log(error);
        Swal.fire("Failed","Something went wrong!","error");
      }
    )
  }

}
