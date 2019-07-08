import { Component, OnInit, OnDestroy } from '@angular/core';
import {MaterialService} from "../shared/services/material.service";
import {Material} from "../shared/models/material.model";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-material-page',
  templateUrl: './material-page.component.html',
  styleUrls: ['./material-page.component.scss']
})
export class MaterialPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  materials: Array<Material>;

  constructor(private materialService: MaterialService) { }

  ngOnInit() {
    this.subscription = this.materialService.getMaterial().subscribe((data: Array<Material>)=>{
        this.materials = data;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }



}
