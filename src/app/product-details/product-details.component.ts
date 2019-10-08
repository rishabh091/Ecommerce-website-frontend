import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  id;
  name;
  details;
  model;
  price;
  inStock;
  imgSrc;

  detailsArr=[];

  url = "http://localhost:10083/home/id/";
  myArray;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get("id");
      this.id = id;
      console.log(this.id);
      this.url = this.url + this.id;
    });

    this.httpClient.get(this.url).subscribe(res => {
      this.myArray = res;

      this.id = this.myArray.id;
      this.name = this.myArray.name;
      this.details = this.myArray.details;
      this.model = this.myArray.model;
      this.price = this.myArray.price;
      this.inStock = this.myArray.inStock;
      this.imgSrc = this.myArray.imgUrl;

      this.detailsArr=this.details.split("\n");
      console.log(this.detailsArr);
    });
  }
}
