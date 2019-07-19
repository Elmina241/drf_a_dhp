import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";


import {BaseApi} from "../../../shared/core/base-api";
import {Packing} from "../models/packing.model";
import {Cap} from "../models/cap.model";

@Injectable()
export class CapService extends BaseApi{

  constructor(public http: HttpClient){
    super(http);
  }

  getCaps(): Observable<any>{
    return this.get('tables/caps');
  }

  getGroups(): Observable<any>{
    return this.get('tables/cap_groups');
  }

  addCap(cap: Cap): Observable<Cap>{
    return this.post('tables/caps/', cap);
  }

  deleteCap(capId: number): Observable<any>{
    return this.delete(`tables/caps/${capId}`);
  }

  editCap(cap: Cap): Observable<Cap>{
    return this.put(`tables/caps/${cap.pk}/`, cap);
  }

}
