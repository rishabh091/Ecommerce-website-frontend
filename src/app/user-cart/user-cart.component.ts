import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  cartArray;
  productsArray=[];

  getCartUrl="http://localhost:10083/cart";
  incrementUrl="http://localhost:10083/cart/increment/1/product/";
  decrementUrl="http://localhost:10083/cart/decrement/1/product/";
  remmoveUrl="http://localhost:10083/cart/deleteItem/productId/";

  constructor(private service : AppService, private router : Router,private httpClient: HttpClient) { }

  ngOnInit() {
    if(!this.service.checkLogin()){
      this.router.navigate(['/home']);
    }

    this.ajaxCall(this.getCartUrl);
  }

  ajaxCall(url){
    this.httpClient.get(this.getCartUrl).subscribe(res=>{
      this.cartArray=res;

      this.cartArray.forEach(element => {
        this.productsArray.push(element.products);
      });
    });
  }

  goToHome(){
    location.href="home";
  }

  increment(productId){
    this.httpClient.get(this.incrementUrl+productId).subscribe(res=>{
      console.log(res);
      location.reload();
    });
  }

  decrement(productId){
    this.httpClient.get(this.decrementUrl+productId).subscribe(res=>{
      console.log(res);
      location.reload();
    });
  }

  removeItem(productId){
    this.httpClient.get(this.remmoveUrl+productId).subscribe(res=>{
      console.log(res);
      location.reload();
    });
  }
}
