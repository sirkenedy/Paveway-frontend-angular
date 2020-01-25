import { Component, OnInit } from '@angular/core';
import { AuthserviceService} from '../../_services';
import { User, Role } from '../../_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentuser: User;
  constructor( private auth:AuthserviceService) { }

  ngOnInit() {
    this.currentuser = this.auth.currentUserValue;
  }

}
