import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

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
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  submitData(){
    this.httpClient.get(this.url).subscribe((res)=>{
      console.log(res);
    });
  }

}
