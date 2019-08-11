import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MaterialService} from "../../shared/services/material.service";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Group, Material} from "../../shared/models/material.model";
import {NgForm} from "@angular/forms";
import {CompComponent, Composition, ProductForm} from "../../shared/models/composition.model";
import {CompositionService} from "../../shared/services/composition.service";
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'app-add-composition',
  templateUrl: './add-composition.component.html',
  styleUrls: ['./add-composition.component.scss']
})
export class AddCompositionComponent implements OnInit {

  @Output() onCompositionAdd = new EventEmitter<Composition>();
  @Input() groups: Array<Group>;
  @Input() modal: NgbModalRef;
  forms: Array<ProductForm>;
  materials: Array<Material>;
  components: Array<CompComponent>;

  constructor(private compositionService: CompositionService,
              private productService: ProductService,
              private materialService: MaterialService
  ) { }

  ngOnInit() {
    this.productService.getProductForms().subscribe((data: Array<ProductForm>)=>{
        this.forms = data;
    });
    this.materialService.getMaterial().subscribe((data: Array<Material>)=>{
        this.materials = data;
    });
  }

  onSubmit(form: NgForm){
    const {code, name, group, prForm, sgr, isFinal, shLife, date, compPackage, standard, certificate, declaration} = form.value;

    const composition = new Composition(code, name, group, sgr, shLife, date, compPackage,
      standard, certificate, declaration, this.components, prForm, isFinal);

    this.compositionService.addComposition(composition).subscribe((composition: Composition) => {
      form.reset();
      this.onCompositionAdd.emit(composition);
      this.modal.close('Save click');
    })
  }
}

