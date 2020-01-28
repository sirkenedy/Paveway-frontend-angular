import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthserviceService } from '../../_services';
import { User, Role } from '../../_models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  user: User;
  returnUrl: string;
  userCat: string = "student";
  category: {
    student: string,
    lecturer: string,
    sponsor: string
  }
  isLoading: boolean;
  @ViewChild("signup", { static: false }) form: any

  constructor(
    private router: Router,
    private auth: AuthserviceService,
    private route: ActivatedRoute,
  ) {
    // redirect to home if already logged in
    if (this.auth.currentUserValue) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.isLoading = false;
    this.user = {
      "email": "",
      "password": "",
      "confirm_password": "",
      "firstname": "",
      "lastname": "",
      "unique_no": "",
      "role": Role.Student,
    }

    this.category = {
      student: "true",
      lecturer: null,
      sponsor: null
    }
  }

  chooseCat(value) {
    if (value == 'student') {
      this.category = {
        student: "true",
        lecturer: null,
        sponsor: null
      }
      this.user.role = Role.Student;
    } else if (value == 'lecturer') {
      this.category = {
        student: null,
        lecturer: "true",
        sponsor: null
      }
      this.user.role = Role.Lecturer;
    } else {
      this.category = {
        student: null,
        lecturer: null,
        sponsor: "true"
      }
      this.user.role = Role.Guest;
    }
  }

  onSubmit({ value, valid }: { value: User, valid: any }) {
    if (!valid) {
      console.log("data are not valid");
    } else {
      console.log(value);
      this.isLoading = true;
      this.subscription = this.auth.register(value).pipe().subscribe(user => {
        this.user = user;
        this.isLoading = false;
        console.log(user);
        this.router.navigate([this.returnUrl]);
      }, err => {
        console.log("Login was not Successful");
        console.log(err.error);
        this.isLoading = false;
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
