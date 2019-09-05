import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Boxing, BoxingMaterial} from "../../shared/models/boxing.model";
import {Color} from "../../shared/models/packing.model";
import {NgbActiveModal, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Group, Material} from "../../shared/models/material.model";
import {PackingService} from "../../shared/services/packing.service";
import {NgForm} from "@angular/forms";
import {BoxingService} from "../../shared/services/boxing.service";
import {CompComponent, Composition, ProductForm} from "../../shared/models/composition.model";
import {ProductService} from "../../shared/services/product.service";
import {MaterialService} from "../../shared/services/material.service";
import {CompositionService} from "../../shared/services/composition.service";
import {AddMatToCompositionComponent} from "../add-composition/add-composition.component";

@Component({
  selector: 'app-edit-composition',
  templateUrl: './edit-composition.component.html',
  styleUrls: ['./edit-composition.component.scss']
})
export class EditCompositionComponent implements OnInit {

  @Output() onCompositionEdit = new EventEmitter<Composition>();
  @Input() groups: Array<Group>;
  @Input() activeModal: NgbActiveModal;
  forms: Array<ProductForm>;
  materials: Array<Material>;
  components: Array<CompComponent> = [];
  @Input() currentComposition: Composition;

  constructor(private compositionService: CompositionService,
              private productService: ProductService,
              private materialService: MaterialService,
              private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.productService.getProductForms().subscribe((data: Array<ProductForm>)=>{
        this.forms = data;
    });
    this.materialService.getMaterial().subscribe((data: Array<Material>)=>{
        this.materials = data;
    });
    this.components = this.currentComposition.components_set;
    for (var c in this.components){
      this.components[c].mat_id = this.components[c].mat.pk;
    }
  }

  findObj(pk: number) :number{
    for (let p in this.components){
      if (this.components[p].pk == pk) return +p;
    }
    return -1;
  }

  onSubmit(form: NgForm){
    let {e_code, e_name, e_group, e_prForm, e_sgr, e_isFinal, e_shLife, e_date, e_compPackage, e_standard, e_certificate, e_declaration} = form.value;

    if (e_date == "") e_date = null;
    if (e_shLife == "") e_shLife = null;

    const composition = new Composition(e_code, e_name, e_group, e_sgr, e_shLife, e_date, e_compPackage,
      e_standard, e_certificate, e_declaration, this.components, e_prForm, e_isFinal, this.currentComposition.pk);

    console.log(composition);

    this.compositionService.editComposition(composition).subscribe((composition: Composition) => {
      form.reset();
      this.onCompositionEdit.emit(composition);
      this.activeModal.close('Save click');
    })
  }

  delComp(pk: number){
    let index = this.findObj(pk);
    this.components.splice(index, 1);
  }

  newComponentAdded(component: CompComponent){
    this.components.push(component);
  }

  open() {
    let modal: NgbModalRef = this.modalService.open(AddMatToCompositionComponent);
    modal.componentInstance.onComponentAdd.subscribe(event => this.newComponentAdded(event));
  }
}
