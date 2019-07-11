import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group, Material} from "../../shared/models/material.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.scss']
})
export class EditMaterialComponent implements OnInit {

  @Input() groups: Array<Group>;
  @Output() onMaterialEdit = new EventEmitter<Material>();

  @Input() currentMaterialId = 1;
  currentMaterial: Material;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){

  }

}
