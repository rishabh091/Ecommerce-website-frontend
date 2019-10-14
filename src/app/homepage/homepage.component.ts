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

  categorySelected = "";
  customSearch;

  addToCartBoolean=false;

  ngOnInit() {
    this.getUserInfo();
  }

  searchDisplay($event){
    this.customSearch=$event.search;
    this.categorySelected=$event.search;
    this.myArray=$event.result;
  }

  getUserInfo() {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: " Basic " + token });

    if (token != undefined) {
      this.httpClient
        .get(this.userUrl, { headers })
        .subscribe((res : any) => {
          console.log(res);

          this.username = res.name;
        });
    }
  }

  ajaxCall(url) {
    this.httpClient.get(url).subscribe(res => {
      this.myArray = res;
      console.log(res);
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
    this.categorySelected = category;
    url = url + category;
    this.ajaxCall(url);
  }

  priceFilter(price1, price2) {
    if(!this.customSearch){
      let url =
      "http://localhost:10083/home/category/" +
      this.categorySelected +
      "/priceFilter/";
    url = url + price1 + "/" + price2;

    this.ajaxCall(url);
    }
    else{
      let url="http://localhost:10083/search/q/"+this.customSearch+"/priceFilter/"+price1+"/"+price2;
      this.ajaxCall(url);
    }
  }

  addToCart(id) {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: " Basic " + token });

    this.httpClient.get(this.addToCartUrl + id, { headers }).subscribe(
      res => {
        this.addToCartBoolean=true;
      },
      error => {
        alert("Can't add to cart");
      }
    );
  }
}
