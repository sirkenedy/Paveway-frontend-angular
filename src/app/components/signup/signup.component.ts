import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService} from '../../_services';
import { User, Role } from '../../_models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user : User;
  userCat : string = "student";
  category : {
    student : string,
    lecturer : string,
    sponsor : string
  }
  isLoading : boolean;
  @ViewChild("signup", {static:false}) form: any

  constructor(private router: Router, private auth:AuthserviceService) { }

  ngOnInit() {
    this.isLoading = false;
    this.user = {
      "email" : "",
      "password" : "",
      "confirm_password" : "",
      "firstname" : "",
      "lastname" : "",
      "unique_no" : "",
      "role" : Role.Student,
    }

    this.category = {
      student:"true",
      lecturer : null,
      sponsor : null
    }
  }
  
  chooseCat(value) {
    if(value=='student'){
      this.category = {
        student:"true",
        lecturer : null,
        sponsor : null
      }
      this.user.role= Role.Student;
    }else if(value=='lecturer') {
      this.category = {
        student:null,
        lecturer : "true",
        sponsor : null
      }
      this.user.role= Role.Lecturer;
    }else{
      this.category = {
        student:null,
        lecturer : null,
        sponsor : "true"
      }
      this.user.role= Role.Guest;
    }
  }

  onSubmit({value, valid} : {value : User , valid:any }) {
    if(!valid) {
      console.log("data are not valid");
    }else {
      console.log(value);
      this.isLoading = true;
      this.auth.register(value).pipe().subscribe(user => { 
        this.user = user; 
        this.isLoading=false;
        console.log(user);
        this.router.navigate(['dashboard']);
    }, err => { 
      console.log("Login was not Successful"); 
      console.log(err.error);
      this.isLoading = false;
      });
    }
  }

}
