import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";


import {BaseApi} from "../../../shared/core/base-api";
import {Formula} from "../models/formula.model";

@Injectable()
export class FormulaService extends BaseApi{

  constructor(public http: HttpClient){
    super(http);
  }

  getFormula(): Observable<any>{
    return this.get('tables/formulas');
  }

  addFormula(formula: Formula): Observable<Formula>{
    return this.post('tables/formulas/', formula);
  }

  deleteFormula(formulaId: number): Observable<any>{
    return this.delete(`tables/formulas/${formulaId}`);
  }

  editFormula(formula: Formula): Observable<Formula>{
    return this.put(`tables/formulas/${formula.pk}/`, formula);
  }

}
