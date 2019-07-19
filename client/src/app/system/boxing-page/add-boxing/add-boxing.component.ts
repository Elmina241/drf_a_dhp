import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {Color} from "../../shared/models/packing.model";
import {Group} from "../../shared/models/material.model";
import {PackingService} from "../../shared/services/packing.service";
import {Boxing, BoxingMaterial} from "../../shared/models/boxing.model";
import {BoxingService} from "../../shared/services/boxing.service";

@Component({
  selector: 'app-add-boxing',
  templateUrl: './add-boxing.component.html',
  styleUrls: ['./add-boxing.component.scss']
})
export class AddBoxingComponent implements OnInit {

  @Output() onBoxingAdd = new EventEmitter<Boxing>();
  @Input() modal: NgbModalRef;
  groups: Array<Group>;
  materials: Array<BoxingMaterial>;
  colors: Array<Color>;

  constructor(private packingService: PackingService, private boxingService: BoxingService) { }

  ngOnInit() {
    this.packingService.getColors().subscribe((data: Array<Color>)=>{
        this.colors = data;
    });
    this.boxingService.getGroups().subscribe((data: Array<Group>)=>{
        this.groups = data;
    });
    this.boxingService.getBoxingMaterials().subscribe((data: Array<BoxingMaterial>)=>{
        this.materials = data;
    });
  }

  onSubmit(form: NgForm){
    const {code, group, color, material, packForm} = form.value;

    const boxing = new Boxing(code, group, packForm, color, material);
    console.log(boxing);

    this.boxingService.addBoxing(boxing).subscribe((boxing: Boxing) => {
      form.reset();
      this.onBoxingAdd.emit(boxing);
      this.modal.close('Save click');
    })
  }
}

