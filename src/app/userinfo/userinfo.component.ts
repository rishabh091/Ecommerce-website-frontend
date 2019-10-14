import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppService } from "../app.service";
import { Router } from "@angular/router";
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: "app-userinfo",
  templateUrl: "./userinfo.component.html",
  styleUrls: ["./userinfo.component.css"]
})
export class UserinfoComponent implements OnInit {
  name;
  email;
  address;
  mobile;
  password;
  isSeller: Boolean;

  //for edit password
  oldPassword;
  newPassword;
  newPasswordConfirm;
  passchangeBool=false;

  //for history
  historyArray;
  user;

  productName;
  price;
  brand;
  details;
  model;
  productImage;
  category;
  stock = false;

  error = false;

  url = "http://localhost:10083/login/userInfo";
  addProductUrl = "http://localhost:10083/addProduct";
  logoutUrl = "http://localhost:10083/login/logout";


  constructor(
    private httpClient: HttpClient,
    private service: AppService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    if (!this.service.checkLogin()) {
      this.router.navigate(["/home"]);
    }

    this.getUserInfo();
    this.getOrderHistory();
  }

  getOrderHistory() {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: " Basic " + token });

    let url = "http://localhost:10083/order/orderHistory";
    this.httpClient.get(url, { headers }).subscribe(res => {
      this.historyArray = res;
    });
  }

  getUserInfo() {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: " Basic " + token });

    this.httpClient.get(this.url, { headers }).subscribe((res: any) => {
      this.user = res;

      this.name = res.name;
      this.email = res.email;
      this.password = res.password;
      this.address = res.address;
      this.mobile = res.mobile;
      this.isSeller = res.seller;
    });
  }

  sendData() {
    if (
      this.productName != undefined &&
      this.productImage != undefined &&
      this.price != undefined &&
      this.details != undefined &&
      this.model != undefined &&
      this.category != undefined &&
      this.stock != undefined
    ) {
      var product = {
        name: this.productName,
        price: this.price,
        details: this.details,
        model: this.model,
        imgUrl: this.productImage,
        category: this.category,
        inStock: this.stock,
        brand: this.brand
      };

      const token = sessionStorage.getItem("token");
      const headers = new HttpHeaders({ Authorization: " Basic " + token });

      this.httpClient
        .post(this.addProductUrl, product, { headers })
        .subscribe(res => {
          alert(JSON.stringify(res));
        });
    } else {
      this.error = true;
    }
  }

  savePassword() {
    if (
      this.oldPassword != undefined &&
      this.newPassword != undefined &&
      this.newPasswordConfirm != undefined
    ) {
      if (this.oldPassword == this.password) {
        if (this.newPassword == this.newPasswordConfirm) {
          this.password = this.newPassword;
          this.passchangeBool=true;
          alert("success");
        } else {
          alert("Passwords doesn't match");
        }
      } else {
        alert("Old password is incorrect");
      }
    } else {
      alert("fields cannot be left empty");
    }
  }

  editProfile() {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: " Basic " + token });

    let editUrl = "http://localhost:10083/login/editProfile";
    let user = {
      name: this.name,
      password: this.password,
      email: this.email,
      mobile: this.mobile,
      address: this.address,
      isSeller: this.isSeller
    };

    if (
      this.name &&
      this.password &&
      this.email &&
      this.mobile &&
      this.address
    ) {
      this.httpClient.post(editUrl, user, { headers }).subscribe(res => {
        if(this.passchangeBool){
          this.logout();
        }
        alert(res);
      });
    }
    else{
      alert("fields cannot be left empty");
    }
  }
  logout() {
    if (this.service.checkLogin()) {
      this.authService.logoutService();

      sessionStorage.setItem("email", "");

      this.httpClient.get(this.logoutUrl).subscribe(res => {
        console.log(JSON.stringify(res));
      });

      location.reload();
      this.router.navigate(["/home"]);
    }
  }

  checkLogin() {
    return this.service.checkLogin();
  }
}
