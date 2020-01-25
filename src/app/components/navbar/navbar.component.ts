import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService} from '../../_services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private subscription : Subscription;
  isLoggedIn: boolean;

  constructor(private router: Router, private auth:AuthserviceService) { 
    
  }

  ngOnInit() {
    this.subscription = this.auth.currentUser.subscribe(res =>{
      if(res){
        this.isLoggedIn = true;
        return;
      }
      this.isLoggedIn = false;
      return false;


    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
