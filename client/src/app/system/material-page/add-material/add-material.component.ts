import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MaterialService} from "../../shared/services/material.service";
import {Group, Material} from "../../shared/models/material.model";

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent implements OnInit {

  @Output() onMaterialAdd = new EventEmitter<Material>();
  @Input() groups: Array<Group>;

  constructor(private materialService: MaterialService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    const {code, name, group, prefix, mark, unit, concentration} = form.value;

    //const groupObj = new Group(group, "");
    const material = new Material(code, name, group, prefix, mark, unit, concentration);
    console.log(material);

    this.materialService.addMaterial(material).subscribe((material: Material) => {
      console.log(material);
      form.reset();
      this.onMaterialAdd.emit(material);
    })


  }


}
