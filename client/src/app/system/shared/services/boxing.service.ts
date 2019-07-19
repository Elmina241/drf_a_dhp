import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";


import {BaseApi} from "../../../shared/core/base-api";
import {Packing} from "../models/packing.model";
import {Cap} from "../models/cap.model";
import {Boxing} from "../models/boxing.model";

@Injectable()
export class BoxingService extends BaseApi{

  constructor(public http: HttpClient){
    super(http);
  }

  getBoxing(): Observable<any>{
    return this.get('tables/boxing');
  }

  getGroups(): Observable<any>{
    return this.get('tables/boxing_groups');
  }

  getBoxingMaterials(): Observable<any>{
    return this.get('tables/boxing_materials');
  }

  addBoxing(boxing: Boxing): Observable<Cap>{
    return this.post('tables/boxing/', boxing);
  }

  deleteBoxing(boxingId: number): Observable<any>{
    return this.delete(`tables/boxing/${boxingId}`);
  }

  editBoxing(boxing: Boxing): Observable<Boxing>{
    return this.put(`tables/boxing/${boxing.pk}/`, boxing);
  }

}
