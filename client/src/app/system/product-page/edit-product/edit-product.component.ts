import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Group} from "../../shared/models/material.model";
import {Mark, Product, Use} from "../../shared/models/product.model";
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  @Output() onProductEdit = new EventEmitter<Product>();
  @Input() groups: Array<Group>;
  @Input() modal: NgbModalRef;
  uses: Array<Use>;
  marks: Array<Mark>;
  @Input() currentProduct: Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getUses().subscribe((data: Array<Use>)=>{
        this.uses = data;
    });
    this.productService.getMarks().subscribe((data: Array<Mark>)=>{
        this.marks = data;
    });
  }

  onSubmit(form: NgForm){
    const {e_code, e_name, e_group, e_mark, e_use, e_option, e_detail} = form.value;

    const product = new Product(e_code, e_name, e_group, e_use, e_option, e_detail, e_mark, this.currentProduct.pk);

    this.productService.editProduct(product).subscribe((product: Product) => {
      form.reset();
      this.onProductEdit.emit(product);
      this.modal.close('Save click');
    })
  }

}
