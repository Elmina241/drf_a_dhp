import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  url : string = 'http://localhost:8000/tables/products/';


  constructor(private http : HttpClient){}
  public getProducts(){

    this.http.get(this.url).toPromise().then((res)=>{
      console.log(res);
    });

  }
}
