import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name;
  password;
  email;
  mobile;
  address;

  url="http://localhost:8080/signup/sendingData";
  constructor(private httpClient: HttpClient,private service: AppService,private router: Router) { }

  ngOnInit() {
    if(this.service.checkLogin()){
      this.router.navigate(['/home']);
    }
  }

  submitData(){
    // let json=`{
    //   "name": `+this.name+`,
    //   "password": `+this.password+`,
    //   "mobile": `+this.mobile+`,
    //   "email": `+this.email+`,
    //   "address": `+this.address+`,
    //   "isSeller": false
    // }`

    let json=`{
      "name": "rashi",
      "password": "abc123",
      "mobile": "9876543210",
      "email": "rashi@gmail.com",
      "address": "panchkula",
      "isSeller": false
    }`;

    this.httpClient.post(this.url,json).subscribe(res=>{
      console.log("Post Request succesfull");
    });
  }

}
