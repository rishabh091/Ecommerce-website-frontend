import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  name = "Apple Iphone X";
  details = [
    "5.8-inch Super Retina display (OLED) with HDR",
    "12MP dual cameras with dual OIS and 7MP TrueDepth front camera—Portrait mode and Portrait Lighting ",
    "Face ID for secure authentication",
    "A11 Bionic with Neural Engine"
  ];
  model = "64gb"
  price = "1,15,000";
  constructor() { }

  ngOnInit() {
  }

}
