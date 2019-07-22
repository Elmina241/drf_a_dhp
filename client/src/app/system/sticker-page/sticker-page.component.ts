import { Component, OnInit } from '@angular/core';
import {CapService} from "../shared/services/cap.service";
import {NgForm} from "@angular/forms";
import {Cap} from "../shared/models/cap.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Sticker} from "../shared/models/sticker.model";
import {StickerService} from "../shared/services/sticker.service";

@Component({
  selector: 'app-sticker-page',
  templateUrl: './sticker-page.component.html',
  styleUrls: ['./sticker-page.component.scss']
})
export class StickerPageComponent implements OnInit {

  stickers: Array<Sticker>;

  closeResult: string;
  currentStickerId: number;
  currentSticker: Sticker;
  isChecked: boolean = false;

  message: string = "";

  constructor(private stickerService: StickerService, private modalService: NgbModal) { }

  ngOnInit() {
    this.stickerService.getStickers().subscribe((data: Array<Sticker>)=>{
      this.stickers = data;
    });
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }

  newStickerAdded(sticker: Sticker){
    this.stickers.push(sticker);
    this.message = `Добавлена укупорка ${sticker.code}`;
  }

  StickerEdited(sticker: Sticker){
    let indx = this.findObj(sticker.pk);
    this.stickers[indx] = sticker;
    this.message = `Отредактирована укупорка ${sticker.code}`;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  findObj(pk: number) :number{
    for (let p in this.stickers){
      if (this.stickers[p].pk == pk) return +p;
    }
    return -1;
  }

  openEditWin(pk: number, window: any){
    this.currentStickerId = this.findObj(pk);
    this.currentSticker = this.stickers[this.currentStickerId];
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
        this.stickerService.deleteSticker(+v).subscribe((data: any) => {
          let index = this.findObj(+v);
          this.message += `${this.stickers[index].code}; `;
          this.stickers.splice(index, 1);
        });
      }
    }
  }

}
