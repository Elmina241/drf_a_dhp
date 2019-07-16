import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group, Material, Prefix, Unit} from "../../shared/models/material.model";
import {NgForm} from "@angular/forms";
import {MaterialService} from "../../shared/services/material.service";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.scss']
})
export class EditMaterialComponent implements OnInit {

  @Output() onMaterialEdit = new EventEmitter<Material>();
  @Input() groups: Array<Group>;
  @Input() modal: NgbModalRef;
  prefixes: Array<Prefix>;
  units: Array<Unit>;
  @Input() currentMaterial: Material;

  //@Input() currentMaterialId = 1;

  constructor(private materialService: MaterialService) { }

  ngOnInit() {
    this.materialService.getUnits().subscribe((data: Array<Unit>)=>{
        this.units = data;
    });
    this.materialService.getPrefixes().subscribe((data: Array<Prefix>)=>{
        this.prefixes = data;
    });
  }

  onSubmit(form: NgForm){
    const {e_code, e_name, e_group, e_prefix, e_mark, e_unit, e_concentration} = form.value;

    const material = new Material(e_code, e_name, e_group, e_prefix, e_mark, e_unit, e_concentration, this.currentMaterial.pk);

    this.materialService.editMaterial(material).subscribe((material: Material) => {
      form.reset();
      this.onMaterialEdit.emit(material);
      this.modal.close('Save click');
    })
  }

}
