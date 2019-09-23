import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

  priceFilter=["0-8000","8000-15000","15000-25000","25000-35000","35000-above"];
  constructor() { }

  ngOnInit() {
  }

}
