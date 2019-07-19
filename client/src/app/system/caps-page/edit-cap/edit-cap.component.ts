import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Group, Prefix, Unit} from "../../shared/models/material.model";
import {NgForm} from "@angular/forms";
import {Color, Packing, PackingMaterial} from "../../shared/models/packing.model";
import {PackingService} from "../../shared/services/packing.service";
import {Cap} from "../../shared/models/cap.model";
import {CapService} from "../../shared/services/cap.service";

@Component({
  selector: 'app-edit-cap',
  templateUrl: './edit-cap.component.html',
  styleUrls: ['./edit-cap.component.scss']
})
export class EditCapComponent implements OnInit {

  @Output() onCapEdit = new EventEmitter<Cap>();
  @Input() modal: NgbModalRef;
  groups: Array<Group>;
  materials: Array<PackingMaterial>;
  colors: Array<Color>;
  @Input() currentCap: Cap;

  constructor(private packingService: PackingService, private capService: CapService) { }

  ngOnInit() {
    this.packingService.getColors().subscribe((data: Array<Color>)=>{
        this.colors = data;
    });
    this.capService.getGroups().subscribe((data: Array<Group>)=>{
        this.groups = data;
    });
    this.packingService.getMaterials().subscribe((data: Array<PackingMaterial>)=>{
        this.materials = data;
    });
  }

  onSubmit(form: NgForm){
    const {e_code, e_group, e_color, e_material, e_form} = form.value;

    const cap = new Cap(e_code, e_group, e_form, e_color, e_material, this.currentCap.pk);

    this.capService.editCap(cap).subscribe((cap: Cap) => {
      form.reset();
      this.onCapEdit.emit(cap);
      this.modal.close('Save click');
    })
  }

}
