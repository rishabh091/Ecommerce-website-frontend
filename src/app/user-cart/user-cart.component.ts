import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  demo=[1];
  name="Apple Iphone X (64gb)";
  quantity=1;
  price=115000;
  finalprice=this.price;

  constructor(private service : AppService, private router : Router) { }

  ngOnInit() {
    if(!this.service.checkLogin()){
      this.router.navigate(['/home']);
    }
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
