import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";


import {BaseApi} from "../../../shared/core/base-api";
import {Material} from "../models/material.model";
import {Product, Production} from "../models/product.model";

@Injectable()
export class ProductService extends BaseApi{

  constructor(public http: HttpClient){
    super(http);
  }

  getProduct(): Observable<any>{
    return this.get('tables/products');
  }

  getProductGroups(): Observable<any>{
    return this.get('tables/product_groups');
  }

  getProductForms(): Observable<any>{
    return this.get('tables/product_forms');
  }

  addProduct(product: Product): Observable<Product>{
    return this.post('tables/products/', product);
  }

  addProduction(production: Production): Observable<Production>{
    return this.post('tables/products/production/', production);
  }

  editProduction(production: Production): Observable<Production>{
    return this.put(`tables/products/production/${production.pk}/`, production);
  }

  deleteProduct(productId: number): Observable<any>{
    return this.delete(`tables/products/${productId}`);
  }

  editProduct(product: Product): Observable<Product>{
    return this.put(`tables/products/${product.pk}/`, product);
  }

  getUses(): Observable<any>{
    return this.get('tables/uses');
  }

  getMarks(): Observable<any>{
    return this.get('tables/marks');
  }


}
