import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Packing} from "../shared/models/packing.model";
import {PackingService} from "../shared/services/packing.service";

@Component({
  selector: 'app-packing',
  templateUrl: './packing-page.component.html',
  styleUrls: ['./packing-page.component.scss']
})
export class PackingPageComponent implements OnInit {

  packing: Array<Packing>;

  closeResult: string;
  currentPackingId: number;
  currentPacking: Packing;
  isChecked: boolean = false;

  message: string = "";

  constructor(private packingService: PackingService, private modalService: NgbModal) { }

  ngOnInit() {
    this.packingService.getPacking().subscribe((data: Array<Packing>)=>{
      this.packing = data;
      console.log(data);
    });
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }

  newPackingAdded(packing: Packing){
    this.packing.push(packing);
    this.message = `Добавлена тара ${packing.code} ${packing.form}`;
  }

  PackingEdited(packing: Packing){
    let indx = this.findObj(packing.pk);
    this.packing[indx] = packing;
    this.message = `Отредактирована тара ${packing.code} ${packing.form}`;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  findObj(pk: number) :number{
    for (let p in this.packing){
      if (this.packing[p].pk == pk) return +p;
    }
    return -1;
  }

  openEditWin(pk: number, window: any){
    this.currentPackingId = this.findObj(pk);
    this.currentPacking = this.packing[this.currentPackingId];
    this.open(window);
  }

  checkList(form: NgForm){
    this.isChecked = false;
    for (let v in form.value) {
      this.isChecked = this.isChecked || form.value[v];
    }
  }

  onSubmit(form: NgForm){
    this.message = 'Удалена тара: ';
    for (let v in form.value){
      if (form.value[v]){
        this.packingService.deletePacking(+v).subscribe((data: any) => {
          let index = this.findObj(+v);
          this.message += `${this.packing[index].code} ${this.packing[index].form}; `;
          this.packing.splice(index, 1);
        });
      }
    }
  }

}
