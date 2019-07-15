import { Component, OnInit, OnDestroy } from '@angular/core';
import {MaterialService} from "../shared/services/material.service";
import {Group, Material} from "../shared/models/material.model";
import {Subscription} from "rxjs/internal/Subscription";
import {Observable} from "rxjs/internal/Observable";
//import {Observable} from "rxjs/Observable";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

}
