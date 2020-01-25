import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService} from '../../_services';
import { User, Role } from '../../_models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentuser: User;
  login:boolean;
  constructor(private router: Router, private auth:AuthserviceService) { 
    this.currentuser = this.auth.currentUserValue;
  }

  ngOnInit() {

    this.auth.getUserValue().pipe().subscribe(user => { 
      this.currentuser = user;
      console.log(user);
  }, err => { 
      console.log(err);
    });
  }

}
