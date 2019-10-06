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
  email;
  password;

  showPassword="password";
  validateUser=true;

  constructor(private service: AppService, private router: Router,private authService: AuthenticationService) { }

  ngOnInit() {
    if(this.service.checkLogin()){
      this.router.navigate(['home']);
    }
  }

  login(){
    if(this.email==undefined || this.password==undefined){
      this.validateUser=false;
    }
    else{
      this.validateUser=true;
    }
    if(this.validateUser){
      sessionStorage.setItem("email",this.email);

      this.authService.authenticate(this.email,this.password).subscribe(
        data=>{
          this.service.isLoggedIn(true);
          this.router.navigate(['home']);
        },error=>{
          this.validateUser=false;
        }
        
      );
    }
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
