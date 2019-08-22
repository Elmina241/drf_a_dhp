import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MaterialService} from "../../shared/services/material.service";
import {NgbModalRef, NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
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
  @Input() activeModal: NgbActiveModal;
  forms: Array<ProductForm>;
  materials: Array<Material>;
  components: Array<CompComponent> = [];

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
  }

  findObj(pk: number) :number{
    for (let p in this.components){
      if (this.components[p].pk == pk) return +p;
    }
    return -1;
  }

  onSubmit(form: NgForm){
    let {code, name, group, prForm, sgr, isFinal, shLife, date, compPackage, standard, certificate, declaration} = form.value;

    if (date == "") date = null;
    if (shLife == "") shLife = null;

    const composition = new Composition(code, name, group, sgr, shLife, date, compPackage,
      standard, certificate, declaration, this.components, prForm, isFinal);

    this.compositionService.addComposition(composition).subscribe((composition: Composition) => {
      form.reset();
      this.onCompositionAdd.emit(composition);
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


@Component({
  template:
    `<div class="modal-form">
    <div class="modal-header">
      <h4 class="modal-title">Добавление реактива</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form #fr="ngForm" (ngSubmit)="onSubmit(fr)">
      <select class="form-control form-control-sm outline-secondary" name="material" ngModel id="material-select">
        <option *ngFor="let m of materials" [ngValue]="m">{{ m.code }} {{ m.name }}</option>
      </select>
      <div class="row">
        <div class="col">
          <h6>Минимум, %</h6>
          <input type="number" ngModel name="min" class="form-control form-control-sm" min="0" max="100" required/>
        </div>
        <div class="col">
          <h6>Максимум, %</h6>
          <input type="number" ngModel name="max" class="form-control form-control-sm" min="0" max="100" required/>
        </div>
      </div>
      <button type="submit" class="btn btn-save">Добавить</button>
  </form>
    </div></div>
  `
})
export class AddMatToCompositionComponent implements OnInit{
  materials: Array<Material>;
  @Output() onComponentAdd = new EventEmitter<CompComponent>();
  constructor(public activeModal: NgbActiveModal, private materialService: MaterialService) {}
  ngOnInit() {
    this.materialService.getMaterial().subscribe((data: Array<Material>)=>{
        this.materials = data;
    });
  }
  onSubmit(form: NgForm){
    let {material, min, max} = form.value;
    let component = new CompComponent(material.pk, min, max, material);
    this.onComponentAdd.emit(component);
    this.activeModal.close('Close click');
  }
}

