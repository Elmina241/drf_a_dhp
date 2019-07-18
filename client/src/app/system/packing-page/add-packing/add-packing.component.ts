import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Group, Material, Prefix, Unit} from "../../shared/models/material.model";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {MaterialService} from "../../shared/services/material.service";
import {Color, Packing, PackingMaterial} from "../../shared/models/packing.model";
import {PackingService} from "../../shared/services/packing.service";

@Component({
  selector: 'app-add-packing',
  templateUrl: './add-packing.component.html',
  styleUrls: ['./add-packing.component.scss']
})
export class AddPackingComponent implements OnInit {

  @Output() onPackingAdd = new EventEmitter<Packing>();
  @Input() modal: NgbModalRef;
  groups: Array<Prefix>;
  materials: Array<Unit>;
  colors: Array<Unit>;

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
    const {code, group, color, material, packForm} = form.value;

    const packing = new Packing(code, group, packForm, color, material);
    console.log(packing);

    this.packingService.addPacking(packing).subscribe((packing: Packing) => {
      form.reset();
      this.onPackingAdd.emit(packing);
      this.modal.close('Save click');
    })
  }
}
