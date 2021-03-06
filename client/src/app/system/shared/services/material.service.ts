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

  getGroups(): Observable<any>{
    return this.get('tables/groups');
  }

  addMaterial(material: Material): Observable<Material>{
    return this.post('tables/materials/', material);
  }

  deleteMaterial(materialId: number): Observable<any>{
    return this.delete(`tables/materials/${materialId}`);
  }

  editMaterial(material: Material): Observable<Material>{
    return this.put(`tables/materials/${material.pk}/`, material);
  }

  getUnits(): Observable<any>{
    return this.get('tables/units');
  }

  getPrefixes(): Observable<any>{
    return this.get('tables/prefixes');
  }


}
