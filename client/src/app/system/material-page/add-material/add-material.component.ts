import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MaterialService} from "../../shared/services/material.service";
import {Group, Material, Prefix, Unit} from "../../shared/models/material.model";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent implements OnInit {

  @Output() onMaterialAdd = new EventEmitter<Material>();
  @Input() groups: Array<Group>;
  @Input() modal: NgbModalRef;
  prefixes: Array<Prefix>;
  units: Array<Unit>;

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
    const {code, name, group, prefix, mark, unit, concentration} = form.value;

    const material = new Material(code, name, group, prefix, mark, unit, concentration);

    this.materialService.addMaterial(material).subscribe((material: Material) => {
      form.reset();
      this.onMaterialAdd.emit(material);
      this.modal.close('Save click');
    })
  }


}
