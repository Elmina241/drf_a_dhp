import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Cap} from "../shared/models/cap.model";
import {CapService} from "../shared/services/cap.service";

@Component({
  selector: 'app-caps-page',
  templateUrl: './caps-page.component.html',
  styleUrls: ['./caps-page.component.scss']
})
export class CapsPageComponent implements OnInit {

  caps: Array<Cap>;

  closeResult: string;
  currentCapId: number;
  currentCap: Cap;
  isChecked: boolean = false;

  message: string = "";

  constructor(private capService: CapService, private modalService: NgbModal) { }

  ngOnInit() {
    this.capService.getCaps().subscribe((data: Array<Cap>)=>{
      this.caps = data;
    });
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }

  newCapAdded(cap: Cap){
    this.caps.push(cap);
    this.message = `Добавлена укупорка ${cap.code} ${cap.form}`;
  }

  CapEdited(cap: Cap){
    let indx = this.findObj(cap.pk);
    this.caps[indx] = cap;
    this.message = `Отредактирована укупорка ${cap.code} ${cap.form}`;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  findObj(pk: number) :number{
    for (let p in this.caps){
      if (this.caps[p].pk == pk) return +p;
    }
    return -1;
  }

  openEditWin(pk: number, window: any){
    this.currentCapId = this.findObj(pk);
    this.currentCap = this.caps[this.currentCapId];
    this.open(window);
  }

  checkList(form: NgForm){
    this.isChecked = false;
    for (let v in form.value) {
      this.isChecked = this.isChecked || form.value[v];
    }
  }

  onSubmit(form: NgForm){
    this.message = 'Удалена укупорка: ';
    for (let v in form.value){
      if (form.value[v]){
        this.capService.deleteCap(+v).subscribe((data: any) => {
          let index = this.findObj(+v);
          this.message += `${this.caps[index].code} ${this.caps[index].form}; `;
          this.caps.splice(index, 1);
        });
      }
    }
  }

}
