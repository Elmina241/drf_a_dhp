import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Group, Prefix, Unit} from "../../shared/models/material.model";
import {NgForm} from "@angular/forms";
import {Color, Packing, PackingMaterial} from "../../shared/models/packing.model";
import {PackingService} from "../../shared/services/packing.service";
import {Cap} from "../../shared/models/cap.model";
import {CapService} from "../../shared/services/cap.service";

@Component({
  selector: 'app-add-cap',
  templateUrl: './add-cap.component.html',
  styleUrls: ['./add-cap.component.scss']
})
export class AddCapComponent implements OnInit {

  @Output() onCapAdd = new EventEmitter<Cap>();
  @Input() modal: NgbModalRef;
  groups: Array<Group>;
  materials: Array<PackingMaterial>;
  colors: Array<Color>;

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
    const {code, group, color, material, packForm} = form.value;

    const cap = new Cap(code, group, packForm, color, material);
    console.log(cap);

    this.capService.addCap(cap).subscribe((cap: Cap) => {
      form.reset();
      this.onCapAdd.emit(cap);
      this.modal.close('Save click');
    })
  }
}
