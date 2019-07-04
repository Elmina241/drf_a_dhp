import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Material} from "../models/material.model";

@Injectable()
export class MaterialService {
  constructor(private http: HttpClient){

  }

  getMaterial(): Observable<Material>{
    return this.http.get('http://localhost:8000/tables/materials');
  }
}
