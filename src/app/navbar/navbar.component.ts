import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {
    // this.route.paramMap.subscribe((params: ParamMap)=>{
    //   this.category=params.get("category");
    //   console.log(this.category);
    //   this.url=this.url+this.category;
    // });
  }


}
