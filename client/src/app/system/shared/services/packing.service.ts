import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";


import {BaseApi} from "../../../shared/core/base-api";
import {Packing} from "../models/packing.model";

@Injectable()
export class PackingService extends BaseApi{

  constructor(public http: HttpClient){
    super(http);
  }



  getPacking(): Observable<any>{
    return this.get('tables/packing');
  }

  getGroups(): Observable<any>{
    return this.get('tables/packing_groups');
  }

  addPacking(packing: Packing): Observable<Packing>{
    return this.post('tables/packing/', packing);
  }

  deletePacking(packingId: number): Observable<any>{
    return this.delete(`tables/packing/${packingId}`);
  }

  editPacking(packing: Packing): Observable<Packing>{
    return this.put(`tables/packing/${packing.pk}/`, packing);
  }

  getColors(): Observable<any>{
    return this.get('tables/colors');
  }

  getMaterials(): Observable<any>{
    return this.get('tables/packing_materials');
  }


}
