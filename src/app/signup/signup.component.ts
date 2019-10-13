import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { HttpParams } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { AppService } from "../app.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  name;
  password;
  email;
  mobile;
  address;
  isSeller;

  url = "http://localhost:10083/signup/sendingData";

  formValidate = true;
  errorField = false;

  constructor(
    private httpClient: HttpClient,
    private service: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.service.checkLogin()) {
      this.router.navigate(["/home"]);
    }
  }

  submitData() {
    if (
      this.name == undefined ||
      this.password == undefined ||
      this.email == undefined ||
      this.mobile == undefined ||
      this.address == undefined
    ) {
      this.formValidate = false;
    } else {
      this.formValidate = true;
    }
    if (this.formValidate) {
      let json = {
        name: this.name,
        password: this.password,
        mobile: this.mobile,
        email: this.email,
        address: this.address,
        isSeller: this.isSeller
      };

      this.httpClient.post(this.url, json).subscribe(res => {
        console.log("Post Request succesfull");
        this.router.navigate(["/login"]);
      }),error=>{
        this.errorField=true;
      };
    }
  }
}
