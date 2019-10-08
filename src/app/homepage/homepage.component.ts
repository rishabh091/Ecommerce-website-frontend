import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"]
})
export class HomepageComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}
  myArray;

  username = "";

  userUrl = "http://localhost:10083/login/userInfo/";

  mobiles = "mobiles";
  laptops = "laptops";
  tablets = "tablets";

  categorySelected = "";

  ngOnInit() {
    this.getUserInfo();
    this.checkSessionStorage();
  }

  getUserInfo() {
    if (sessionStorage.getItem("email") != "") {
      let email = sessionStorage.getItem("email");
      let temp = email.split("@");
      let emailName = temp[0];
      let emailId = temp[1].split(".")[0];
      let domain = temp[1].split(".")[1];

      this.httpClient
        .get(this.userUrl + emailName + "/" + emailId + "/" + domain)
        .subscribe(res => {
          console.log(Object.keys(res));

          this.username = res.name;
        });
    }
  }

  checkSessionStorage() {
    if (sessionStorage.length == 0) {
      this.email = "";
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

    if (category == "mobiles") {
      this.categorySelected = category;
      url = url + category;
      this.ajaxCall(url);
    }
    if (category == "laptops") {
      this.categorySelected = category;
      url = url + category;
      this.ajaxCall(url);
    }
    if (category == "tablets") {
      this.categorySelected = category;
      url = url + category;
      this.ajaxCall(url);
    }
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
}
