import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {Color} from "../../shared/models/packing.model";
import {Group} from "../../shared/models/material.model";
import {PackingService} from "../../shared/services/packing.service";
import {Boxing, BoxingMaterial} from "../../shared/models/boxing.model";
import {BoxingService} from "../../shared/services/boxing.service";

@Component({
  selector: 'app-edit-boxing',
  templateUrl: './edit-boxing.component.html',
  styleUrls: ['./edit-boxing.component.scss']
})
export class EditBoxingComponent implements OnInit {

  @Output() onBoxingEdit = new EventEmitter<Boxing>();
  @Input() modal: NgbModalRef;
  groups: Array<Group>;
  materials: Array<BoxingMaterial>;
  colors: Array<Color>;
  @Input() currentBoxing: Boxing;

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
    const {e_code, e_group, e_color, e_material, e_form} = form.value;

    const boxing = new Boxing(e_code, e_group, e_form, e_color, e_material, this.currentBoxing.pk);

    this.boxingService.editBoxing(boxing).subscribe((boxing: Boxing) => {
      form.reset();
      this.onBoxingEdit.emit(boxing);
      this.modal.close('Save click');
    })
  }

}
