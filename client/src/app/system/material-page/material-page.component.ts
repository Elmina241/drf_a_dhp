import { Component, OnInit, OnDestroy } from '@angular/core';
import {MaterialService} from "../shared/services/material.service";
import {Group, Material} from "../shared/models/material.model";
import {Subscription} from "rxjs/internal/Subscription";
import {Observable} from "rxjs/internal/Observable";
//import {Observable} from "rxjs/Observable";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-material-page',
  templateUrl: './material-page.component.html',
  styleUrls: ['./material-page.component.scss']
})
export class MaterialPageComponent implements OnInit, OnDestroy {

  //subscription: Subscription;
  materials: Array<Material>;
  groups: Array<Group>;

  closeResult: string;
  currentMaterialId: number;
  currentMaterial: Material;

  message: string = "";

  constructor(private materialService: MaterialService, private modalService: NgbModal) { }

  ngOnInit() {
    this.materialService.getMaterial().subscribe((data: Array<Material>)=>{
        this.materials = data;
    });
    this.materialService.getGroups().subscribe((data: Array<Group>)=>{
        this.groups = data;
    });
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }

  newMaterialAdded(material: Material){
    this.materials.push(material);
    this.message = `Добавлен реактив ${material.code} ${material.name}`;
  }

  MaterialEdited(material: Material){
    let indx = this.findMaterial(material.pk);
    this.materials[indx] = material;
    this.message = `Отредактирован реактив ${material.code} ${material.name}`;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  findMaterial(pk: number) :number{
    for (let m in this.materials){
      if (this.materials[m].pk == pk) return +m;
    }
    return -1;
  }

  openEditWin(pk: number, window: any){
    this.currentMaterialId = this.findMaterial(pk);
    this.currentMaterial = this.materials[this.currentMaterialId];
    this.open(window);
  }

  onSubmit(form: NgForm){
    this.message = 'Удалены реактивы: ';
    for (let v in form.value){
      if (form.value[v]){
        this.materialService.deleteMaterial(+v).subscribe((data: any) => {
          let index = this.findMaterial(+v);
          this.message += `${this.materials[index].code} ${this.materials[index].name}; `;
          this.materials.splice(index, 1);
        });
      }
    }
  }

}
