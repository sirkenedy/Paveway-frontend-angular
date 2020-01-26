import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthserviceService } from '../../_services';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy  {
  private subscription : Subscription;
  loginForm: FormGroup;
  isLoading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthserviceService,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
  ) {
    // redirect to home if already logged in
    if (this.auth.currentUserValue) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.subscription = this.auth.login({ "email": this.f.email.value, "password": this.f.password.value })
      .pipe(first())
      .subscribe(
        data => {
          this.flashMessage.show('You are now logged in', {
            cssClass:'alert-success', timeout: 4000
          });
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error.error.error;
          ;
          this.isLoading = false;
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
