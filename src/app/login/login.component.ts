import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { AppService } from '../app.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username;
  password;

  showPassword="password";
  constructor(private service: AppService, private router: Router,private authService: AuthenticationService) { }

  ngOnInit() {
    if(this.service.checkLogin()){
      this.router.navigate(['home']);
    }
  }

  login(){

    this.authService.authenticate(this.username,this.password).subscribe(
      data=>{
        this.service.isLoggedIn(true);
        this.router.navigate(['home']);
      }
    );
  }

  showPasswordFunction(){
    if(this.showPassword=="password"){
      this.showPassword="text";
    }
    else{
      this.showPassword="password";
    }
  }
}
