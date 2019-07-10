import { Component, OnInit, OnDestroy } from '@angular/core';
import {MaterialService} from "../shared/services/material.service";
import {Group, Material} from "../shared/models/material.model";
import {Subscription} from "rxjs/internal/Subscription";
import {Observable} from "rxjs/internal/Observable";
//import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-material-page',
  templateUrl: './material-page.component.html',
  styleUrls: ['./material-page.component.scss']
})
export class MaterialPageComponent implements OnInit, OnDestroy {

  //subscription: Subscription;
  materials: Array<Material>;
  groups: Array<Group>;

  constructor(private materialService: MaterialService) { }

  ngOnInit() {
    this.materialService.getMaterial().subscribe((data: Array<Material>)=>{
        this.materials = data;
    })
    this.materialService.getGroups().subscribe((data: Array<Group>)=>{
        this.groups = data;
    })
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }

  newMaterialAdded(material: Material){
    this.materials.push(material);
  }

}
