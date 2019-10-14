import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  id;
  name: String;
  details;
  model;
  category;
  price;
  inStock;
  brand: String;
  imgSrc;

  isSeller;

  detailsArr = [];

  url = "http://localhost:10083/home/id/";
  addToCartUrl = "http://localhost:10083/cart/addItem/productId/";
  myArray;

  addToCartBoolean=false;
  editProductBoolean=false;

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

    this.checkUserSeller();

    this.httpClient.get(this.url).subscribe(res => {
      this.myArray = res;
      console.log(this.myArray);

      this.id = this.myArray.id;
      this.name = this.myArray.name;
      this.details = this.myArray.details;
      this.model = this.myArray.model;
      this.price = this.myArray.price;
      this.category = this.myArray.category;
      this.inStock = this.myArray.inStock;
      this.imgSrc = this.myArray.imgUrl;
      this.brand = this.myArray.brand;

      this.detailsArr = this.details.split("\n");

      console.log(this.id);
      console.log(this.brand);
      console.log(this.imgSrc);
      console.log(this.category);
    });
  }

  checkUserSeller(){
    let url="http://localhost:10083/login/userInfo";
    this.httpClient.get(url).subscribe((res: any)=>{
      this.isSeller=res.seller;
    });
  }

  addToCart() {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: " Basic " + token });

    this.httpClient.get(this.addToCartUrl + this.id, { headers }).subscribe(
      res => {
        this.addToCartBoolean=true;
      },
      error => {
        alert("Can't add to cart");
      }
    );
  }

  editData() {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: " Basic " + token });

    let url="http://localhost:10083/editProduct";

    var product = {
      id: this.id,
      name: this.name,
      price: this.price,
      details: this.details,
      model: this.model,
      imgUrl: this.imgSrc,
      category: this.category,
      inStock: this.inStock,
      brand: this.brand
    };

    this.httpClient.post(url,product,{headers}).subscribe(res=>{
      this.editProductBoolean=true;
    });
  }
}
