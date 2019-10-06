import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() category;

  myArray;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.ajaxCall(this.category);
  }

  ajaxCall(category){
    let url="http://localhost:10083/home/category/"+category;

    this.httpClient.get(url).subscribe(res=>{
      this.myArray=res;
    });
  }

}
