import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Group, Unit} from "../../shared/models/material.model";
import {Mark, Product, Use} from "../../shared/models/product.model";
import {ProductService} from "../../shared/services/product.service";
import {Composition} from "../../shared/models/composition.model";
import {Sticker} from "../../shared/models/sticker.model";
import {Packing} from "../../shared/models/packing.model";
import {Boxing} from "../../shared/models/boxing.model";
import {Cap} from "../../shared/models/cap.model";
import {BoxingService} from "../../shared/services/boxing.service";
import {PackingService} from "../../shared/services/packing.service";
import {CapService} from "../../shared/services/cap.service";
import {StickerService} from "../../shared/services/sticker.service";
import {CompositionService} from "../../shared/services/composition.service";
import {MaterialService} from "../../shared/services/material.service";

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
  caps: Array<Cap>;
  compositions: Array<Composition>;
  containers: Array<Packing>;
  stickers: Array<Sticker>;
  boxing: Array<Boxing>;
  units: Array<Unit>;
  @Input() currentProduct: Product;

  constructor(private productService: ProductService,
              private capService: CapService,
              private compositionService: CompositionService,
              private packingService: PackingService,
              private stickerService: StickerService,
              private boxingService: BoxingService,
              private materialService: MaterialService,
  ) { }

  ngOnInit() {
    this.productService.getUses().subscribe((data: Array<Use>)=>{
        this.uses = data;
    });
    this.productService.getMarks().subscribe((data: Array<Mark>)=>{
        this.marks = data;
    });
    this.capService.getCaps().subscribe((data: Array<Cap>)=>{
        this.caps = data;
    });
    this.compositionService.getComposition().subscribe((data: Array<Composition>)=>{
        this.compositions = data;
    });
    this.packingService.getPacking().subscribe((data: Array<Packing>)=>{
        this.containers = data;
    });
    this.stickerService.getStickers().subscribe((data: Array<Sticker>)=>{
        this.stickers = data;
    });
    this.boxingService.getBoxing().subscribe((data: Array<Boxing>)=>{
        this.boxing = data;
    });
    this.materialService.getUnits().subscribe((data: Array<Unit>)=>{
        this.units = data;
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
