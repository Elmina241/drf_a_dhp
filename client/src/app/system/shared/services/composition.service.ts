import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";


import {BaseApi} from "../../../shared/core/base-api";
import {Composition} from "../models/composition.model";

@Injectable()
export class CompositionService extends BaseApi{

  constructor(public http: HttpClient){
    super(http);
  }

  getComposition(): Observable<any>{
    return this.get('tables/compositions');
  }

  getCompositionGroups(): Observable<any>{
    return this.get('tables/composition_groups');
  }

  addComposition(composition: Composition): Observable<Composition>{
    return this.post('tables/compositions/', composition);
  }

  deleteComposition(compositionId: number): Observable<any>{
    return this.delete(`tables/compositions/${compositionId}`);
  }

  editComposition(composition: Composition): Observable<Composition>{
    return this.put(`tables/compositions/${composition.pk}/`, composition);
  }

}
