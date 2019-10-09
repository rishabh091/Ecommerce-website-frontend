import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from '../app.service';
import { Router } from '@angular/router';

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
  isSeller:Boolean;

  productName;
  price;
  brand;
  details;
  model;
  productImage;
  category;
  stock=false;

  error=false;

  url = "http://localhost:10083/login/userInfo/";
  addProductUrl = "http://localhost:10083/addProduct";

  constructor(private httpClient: HttpClient,private service: AppService,private router: Router) {}

  ngOnInit() {
    if (!this.service.checkLogin()) {
      this.router.navigate(["/home"]);
    }

    this.getUserInfo();
  }

  getUserInfo() {
    let email = sessionStorage.getItem("email");
    let temp = email.split("@");
    let emailName = temp[0];
    let emailId = temp[1].split(".")[0];
    let domain = temp[1].split(".")[1];

    this.httpClient
      .get(this.url + emailName + "/" + emailId + "/" + domain)
      .subscribe((res : Object)=> {
        console.log(Object.keys(res));

        this.name = res.name;
        this.email = res.email;
        this.address = res.address;
        this.mobile = res.mobile;
        this.isSeller=res.seller;
      });
  }

  sendData(){
    if(this.productName!=undefined && this.productImage!=undefined && 
    this.price!=undefined && this.details!=undefined && this.model!=undefined && this.category!=undefined
    && this.stock!=undefined){
      

      let product={
        name : this.productName,
        price : this.price,
        details: this.details,
        model: this.model,
        imgUrl: this.productImage,
        category: this.category,
        inStock: this.stock,
        brand: this.brand
      };

      this.httpClient.post(this.addProductUrl,product).subscribe(res=>{
        alert(JSON.stringify(res));
      });

    }
    else{
      this.error=true;
    }
  }
}
