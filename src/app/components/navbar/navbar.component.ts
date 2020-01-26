import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from '../../_services';
import { Subscription } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private auth: AuthserviceService,
    private flashMessage: FlashMessagesService,
  ) {

  }

  ngOnInit() {
    this.subscription = this.auth.currentUser.subscribe(res => {
      if (res) {
        this.isLoggedIn = true;
        return;
      }
      this.isLoggedIn = false;
      return false;


    });
  }

  onLogout() {
    this.auth.logout();
    this.flashMessage.show('You are now logged out', {
      cssClass:'alert-danger', timeout: 4000
    });
    this.router.navigate(['/signin']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
