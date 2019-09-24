import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

  priceFilter=["0-8000","8000-15000","15000-25000","25000-35000","35000-above"];
  myArray=["1","2","3","4","5","6","7","8","9","10"];
  constructor() { }

  ngOnInit() {
  }

}
