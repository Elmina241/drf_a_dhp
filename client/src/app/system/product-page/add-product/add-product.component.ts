import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Group} from "../../shared/models/material.model";
import {Mark, Product, Use} from "../../shared/models/product.model";
import {ProductService} from "../../shared/services/product.service";
import {Cap} from "../../shared/models/cap.model";
import {CapService} from "../../shared/services/cap.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @Output() onProductAdd = new EventEmitter<Product>();
  @Input() groups: Array<Group>;
  @Input() modal: NgbModalRef;
  marks: Array<Mark>;
  uses: Array<Use>;
  caps: Array<Cap>;

  constructor(private productService: ProductService, private capService: CapService) { }

  ngOnInit() {
    this.productService.getMarks().subscribe((data: Array<Mark>)=>{
        this.marks = data;
    });
    this.productService.getUses().subscribe((data: Array<Use>)=>{
        this.uses = data;
    });
    this.capService.getCaps().subscribe((data: Array<Cap>)=>{
        this.caps = data;
    });
  }

  onSubmit(form: NgForm){
    const {code, name, group, mark, use, option, detail} = form.value;

    const product = new Product(code, name, group, use, option, detail, mark);

    this.productService.addProduct(product).subscribe((product: Product) => {
      form.reset();
      this.onProductAdd.emit(product);
      this.modal.close('Save click');
    })
  }
}
