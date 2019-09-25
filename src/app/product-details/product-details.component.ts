import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  name;
  details = [
    "5.8-inch Super Retina display (OLED) with HDR",
    "12MP dual cameras with dual OIS and 7MP TrueDepth front camera—Portrait mode and Portrait Lighting ",
    "Face ID for secure authentication",
    "A11 Bionic with Neural Engine"
  ];
  model;
  price;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      let name=params.get('name');
      this.name=name;

      let price=params.get('price');
      this.price=price;

      let model=params.get('model');
      this.model=model;
    });
  }
}
