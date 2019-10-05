import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient,private service: AppService,private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logout(){
    if(this.service.checkLogin()){
      this.authService.logoutService();
      this.router.navigate(['/home']);
    }
  }

  checkLogin(){
    return this.service.checkLogin();
  }

}
