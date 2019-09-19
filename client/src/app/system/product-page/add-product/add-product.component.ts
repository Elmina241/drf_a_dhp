import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Group, Unit} from "../../shared/models/material.model";
import {Mark, Product, Production, Use} from "../../shared/models/product.model";
import {ProductService} from "../../shared/services/product.service";
import {Cap} from "../../shared/models/cap.model";
import {CapService} from "../../shared/services/cap.service";
import {CompositionService} from "../../shared/services/composition.service";
import {PackingService} from "../../shared/services/packing.service";
import {StickerService} from "../../shared/services/sticker.service";
import {BoxingService} from "../../shared/services/boxing.service";
import {Composition} from "../../shared/models/composition.model";
import {Packing} from "../../shared/models/packing.model";
import {Boxing} from "../../shared/models/boxing.model";
import {Sticker} from "../../shared/models/sticker.model";
import {MaterialService} from "../../shared/services/material.service";

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
  compositions: Array<Composition>;
  containers: Array<Packing>;
  stickers: Array<Sticker>;
  boxing: Array<Boxing>;
  units: Array<Unit>;

  constructor(private productService: ProductService,
              private capService: CapService,
              private compositionService: CompositionService,
              private packingService: PackingService,
              private stickerService: StickerService,
              private boxingService: BoxingService,
              private materialService: MaterialService,
  ) { }

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
    const {code, name, group,
      mark, use, option, detail,
      composition, composition_num, composition_unit,
      container, container_num, container_unit,
      cap, cap_num, cap_unit,
      sticker, sticker_num, sticker_unit,
      boxing, boxing_num, boxing_unit
    } = form.value;

    const production = new Production(composition, composition_num, composition_unit,
      container, container_num, container_unit,
      cap, cap_num, cap_unit,
      sticker, sticker_num, sticker_unit,
      boxing, boxing_num, boxing_unit);
    const product = new Product(code, name, group, use, option, detail, mark, 0);

    console.log(production);

    this.productService.addProduction(production).subscribe((production: Production) => {
      product.production_id = production.pk;
      this.productService.addProduct(product).subscribe((product: Product) => {
        form.reset();
        this.onProductAdd.emit(product);
        this.modal.close('Save click');
      })
    })
  }
}
