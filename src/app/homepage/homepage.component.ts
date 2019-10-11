import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"]
})
export class HomepageComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}
  myArray;

  username = "";

  userUrl = "http://localhost:10083/login/userInfo";
  addToCartUrl = "http://localhost:10083/cart/addItem/productId/";

  mobiles = "mobiles";
  laptops = "laptops";
  tablets = "tablets";

  categorySelected = "";

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: " Basic " + token });

    if (token != undefined) {
      this.httpClient
        .get(this.userUrl, { headers })
        .subscribe((res) => {
          console.log(res);

          this.username = res.name;
        });
    }
  }

  ajaxCall(url) {
    this.httpClient.get(url).subscribe(res => {
      this.myArray = res;
    });
  }

  checkCategorySelected() {
    if (this.categorySelected != "") {
      return true;
    } else {
      return false;
    }
  }

  filter(category) {
    let url = "http://localhost:10083/home/category/";
    this.email = "";
    this.categorySelected = category;
    url = url + category;
    this.ajaxCall(url);
  }

  priceFilter(price1, price2) {
    let url =
      "http://localhost:10083/home/category/" +
      this.categorySelected +
      "/priceFilter/";
    this.email = "";
    url = url + price1 + "/" + price2;

    this.ajaxCall(url);
  }

  addToCart(id) {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: " Basic " + token });

    this.httpClient.get(this.addToCartUrl + id, { headers }).subscribe(
      res => {
        alert("Added to cart sucessfully");
      },
      error => {
        alert("Can't add to cart");
      }
    );
  }
}
