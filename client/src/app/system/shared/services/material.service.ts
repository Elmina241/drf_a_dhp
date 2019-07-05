import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";

import {BaseApi} from "../../../shared/core/base-api";
import {Material} from "../models/material.model";

@Injectable()
export class MaterialService extends BaseApi{

  constructor(public http: HttpClient){
    super(http);
  }

  getMaterial(): Observable<any>{
    return this.get('tables/materials');
  }
}
