import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AppService } from "../app.service";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  logoutUrl = "http://localhost:10083/login/logout";
  search;

  @Output() searchList = new EventEmitter<Object>();
  @Input() homepageActive;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private service: AppService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {}

  logout() {
    if (this.service.checkLogin()) {
      this.authService.logoutService();

      sessionStorage.setItem("email", "");

      this.httpClient.get(this.logoutUrl).subscribe(res => {
        console.log(JSON.stringify(res));
      });

      location.reload();
      this.router.navigate(["/home"]);
    }
  }

  checkLogin() {
    return this.service.checkLogin();
  }

  searchOnClick() {
    let url = "http://localhost:10083/search/";

    if (this.search != undefined && this.search != " ") {
      this.httpClient.get(url + this.search).subscribe(res => {
        let object = {};
        object["search"] = this.search;
        object["result"] = res;

        this.searchList.emit(object);
      });
    }
  }
}
