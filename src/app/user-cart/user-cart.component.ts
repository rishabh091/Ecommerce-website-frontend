import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  name="Apple Iphone X (64gb)";
  quantity=1;
  price=115000;
  finalprice=this.price;

  constructor() { }

  ngOnInit() {
  }

  goToHome(){
    location.href="home";
  }
  increment(){
    this.quantity=this.quantity+1;
    this.finalprice=this.price*this.quantity;
  }
  decrement(){
    if(this.quantity>1){
      this.quantity=this.quantity-1;
    }
    this.finalprice=this.price*this.quantity
  }

}
