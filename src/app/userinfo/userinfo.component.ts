import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppService } from "../app.service";
import { Router } from "@angular/router";

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
  isSeller: Boolean;

  //for history
  historyArray;

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

  constructor(
    private httpClient: HttpClient,
    private service: AppService,
    private router: Router
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

    this.httpClient.get(this.url,{headers}).subscribe((res: Object) => {
      console.log(Object.keys(res));

      this.name = res.name;
      this.email = res.email;
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
}
