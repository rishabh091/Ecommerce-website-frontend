import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-user-cart",
  templateUrl: "./user-cart.component.html",
  styleUrls: ["./user-cart.component.css"]
})
export class UserCartComponent implements OnInit {
  cartArray;
  totalPrice;

  buyBoolean=false;

  getCartUrl = "http://localhost:10083/cart";
  incrementUrl = "http://localhost:10083/cart/increment/1/product/";
  decrementUrl = "http://localhost:10083/cart/decrement/1/product/";
  remmoveUrl = "http://localhost:10083/cart/deleteItem/productId/";

  constructor(
    private service: AppService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    if (!this.service.checkLogin()) {
      this.router.navigate(["/home"]);
    }

    this.ajaxCall(this.getCartUrl);
  }

  ajaxCall(url) {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: " Basic " + token });

    this.httpClient.get(url, { headers }).subscribe(res => {
      this.cartArray = res;
      let total = 0;

      this.cartArray.forEach(element => {
        let quantity = element.quantity;
        total = total + (element.products.price * quantity);
      });

      console.log(total);
      this.totalPrice = total;
    });
  }

  goToHome() {
    location.href = "home";
  }

  increment(productId) {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: " Basic " + token });

    this.httpClient
      .get(this.incrementUrl + productId, { headers })
      .subscribe(res => {
        console.log(res);
        this.ajaxCall(this.getCartUrl);
      });
  }

  decrement(productId) {
    this.cartArray.forEach(element => {
      let product = element.products;

      if (product.id == productId) {
        if (element.quantity > 1) {
          const token = sessionStorage.getItem("token");
          const headers = new HttpHeaders({ Authorization: " Basic " + token });

          this.httpClient
            .get(this.decrementUrl + productId, { headers })
            .subscribe(res => {
              console.log(res);
              this.ajaxCall(this.getCartUrl);
            });

          return;
        }
      }
    });
  }

  removeItem(productId) {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: " Basic " + token });

    this.httpClient
      .get(this.remmoveUrl + productId, { headers })
      .subscribe(res => {
        console.log(res);
        this.ajaxCall(this.getCartUrl);
      });
  }

  payment(){
    let url="http://localhost:10083/order/createOrder";

    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({Authorization: " Basic " + token});

    this.httpClient.get(url,{headers}).subscribe(res=>{
      this.buyBoolean=true;
      this.ajaxCall(this.getCartUrl);
    });
  }
}
