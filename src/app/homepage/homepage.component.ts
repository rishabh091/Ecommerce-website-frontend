import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

  constructor(private httpClient: HttpClient) {}
  myArray;

  url = "http://localhost:10083/home";

  id;
  name;
  details = [];
  model;
  price;
  inStock;
  imgSrc;

  categorySelected="";

  ngOnInit() {
    this.ajaxCall(this.url);
  }

  ajaxCall(url){
    this.httpClient.get(url).subscribe(res => {
      console.log(res);
      this.myArray = res;
    }); 
  }

  checkCategorySelected(){
    if(this.categorySelected!=""){
      return true;
    }
    else{
      return false;
    }
  }

  filter(category){
    let url="http://localhost:10083/home/category/";

    if(category=="mobiles"){
      this.categorySelected=category;
      url=url+category;
      this.ajaxCall(url);
    }
    if(category=="laptops"){
      this.categorySelected=category;
      url=url+category;
      this.ajaxCall(url);
    }
    if(category=="tablets"){
      this.categorySelected=category;
      url=url+category;
      this.ajaxCall(url);
    }
  }

  priceFilter(price1,price2){
    let url="http://localhost:10083/home/priceFilter/";
    url=url+price1+"/"+price2;

    this.ajaxCall(url);
  }
}

