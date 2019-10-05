import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(username,password){
    // const headers=new HttpHeaders({Authorisation: 'Basic'+btoa(username+':'+password)});
    const headers=new HttpHeaders();
    headers.append("username",username);
    headers.append("password",password);

    return this.http.get("http://localhost:10083/login/checkUser",{headers}).pipe(
      map(data=>{
        sessionStorage.setItem('token',username+':'+password);
      }
    ));
  }
}
