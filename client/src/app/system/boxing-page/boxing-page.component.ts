import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Boxing} from "../shared/models/boxing.model";
import {BoxingService} from "../shared/services/boxing.service";

@Component({
  selector: 'app-boxing-page',
  templateUrl: './boxing-page.component.html',
  styleUrls: ['./boxing-page.component.scss']
})
export class BoxingPageComponent implements OnInit {

  boxing: Array<Boxing>;

  closeResult: string;
  currentBoxingId: number;
  currentBoxing: Boxing;
  isChecked: boolean = false;

  message: string = "";

  constructor(private boxingService: BoxingService, private modalService: NgbModal) { }

  ngOnInit() {
    this.boxingService.getBoxing().subscribe((data: Array<Boxing>)=>{
      this.boxing = data;
    });
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }

  newBoxingAdded(boxing: Boxing){
    this.boxing.push(boxing);
    this.message = `Добавлена упаковка ${boxing.code} ${boxing.form}`;
  }

  BoxingEdited(boxing: Boxing){
    let indx = this.findObj(boxing.pk);
    this.boxing[indx] = boxing;
    this.message = `Отредактирована упаковка ${boxing.code} ${boxing.form}`;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  findObj(pk: number) :number{
    for (let p in this.boxing){
      if (this.boxing[p].pk == pk) return +p;
    }
    return -1;
  }

  openEditWin(pk: number, window: any){
    this.currentBoxingId = this.findObj(pk);
    this.currentBoxing = this.boxing[this.currentBoxingId];
    this.open(window);
  }

  checkList(form: NgForm){
    this.isChecked = false;
    for (let v in form.value) {
      this.isChecked = this.isChecked || form.value[v];
    }
  }

  onSubmit(form: NgForm){
    this.message = 'Удалена упаковка: ';
    for (let v in form.value){
      if (form.value[v]){
        this.boxingService.deleteBoxing(+v).subscribe((data: any) => {
          let index = this.findObj(+v);
          this.message += `${this.boxing[index].code} ${this.boxing[index].form}; `;
          this.boxing.splice(index, 1);
        });
      }
    }
  }

}
