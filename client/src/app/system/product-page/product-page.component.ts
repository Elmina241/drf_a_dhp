import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Group} from "../shared/models/material.model";
import {Product} from "../shared/models/product.model";
import {ProductService} from "../shared/services/product.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  products: Array<Product>;
  filteredProducts: Array<Product>;
  groups: Array<Group>;

  closeResult: string;
  currentProductId: number;
  currentProduct: Product;
  currentGroup: number = -1;
  isChecked: boolean = false;

  message: string = "";

  constructor(private productService: ProductService, private modalService: NgbModal) { }

  ngOnInit() {
    this.productService.getProduct().subscribe((data: Array<Product>)=>{
        this.products = data;
        this.filteredProducts = this.products;
    });
    this.productService.getProductGroups().subscribe((data: Array<Group>)=>{
        this.groups = data;
    });
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }

  newProductAdded(product: Product){
    this.products.push(product);
    this.message = `Добавлен продукт ${product.code} ${product.name}`;
  }

  ProductEdited(product: Product){
    let indx = this.findObj(product.pk);
    this.products[indx] = product;
    this.message = `Отредактирован продукт ${product.code} ${product.name}`;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

   openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  findObj(pk: number) :number{
    for (let p in this.products){
      if (this.products[p].pk == pk) return +p;
    }
    return -1;
  }

  openEditWin(pk: number, window: any){
    this.currentProductId = this.findObj(pk);
    this.currentProduct = this.products[this.currentProductId];
    console.log(this.currentProduct);
    this.openLg(window);
  }

  checkList(form: NgForm){
    this.isChecked = false;
    for (let v in form.value) {
      this.isChecked = this.isChecked || form.value[v];
    }
  }

  onSubmit(form: NgForm){
    this.message = 'Удалена продукция: ';
    for (let v in form.value){
      if (form.value[v]){
        this.productService.deleteProduct(+v).subscribe((data: any) => {
          let index = this.findObj(+v);
          this.message += `${this.products[index].code} ${this.products[index].name}; `;
          this.products.splice(index, 1);
        });
      }
    }
  }

  applyFilter(){
    if (this.currentGroup == -1){
      this.filteredProducts = this.products;
    }
    else this.filteredProducts = this.products.filter((m: any)=>{
      return m.group.pk == this.currentGroup;
    });
  }

}
