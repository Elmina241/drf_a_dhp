import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {PackingService} from "../../shared/services/packing.service";
import {Color, Packing, PackingMaterial} from "../../shared/models/packing.model";
import {Group, Prefix, Unit} from "../../shared/models/material.model";

@Component({
  selector: 'app-edit-packing',
  templateUrl: './edit-packing.component.html',
  styleUrls: ['./edit-packing.component.scss']
})
export class EditPackingComponent implements OnInit {

  @Output() onPackingEdit = new EventEmitter<Packing>();
  @Input() modal: NgbModalRef;
  groups: Array<Prefix>;
  materials: Array<Unit>;
  colors: Array<Unit>;
  @Input() currentPacking: Packing;

  constructor(private packingService: PackingService) { }

  ngOnInit() {
    this.packingService.getColors().subscribe((data: Array<Color>)=>{
        this.colors = data;
    });
    this.packingService.getGroups().subscribe((data: Array<Group>)=>{
        this.groups = data;
    });
    this.packingService.getMaterials().subscribe((data: Array<PackingMaterial>)=>{
        this.materials = data;
    });
  }

  onSubmit(form: NgForm){
    const {e_code, e_group, e_color, e_material, e_form} = form.value;

    const packing = new Packing(e_code, e_group, e_form, e_color, e_material, this.currentPacking.pk);

    this.packingService.editPacking(packing).subscribe((packing: Packing) => {
      form.reset();
      this.onPackingEdit.emit(packing);
      this.modal.close('Save click');
    })
  }

}
