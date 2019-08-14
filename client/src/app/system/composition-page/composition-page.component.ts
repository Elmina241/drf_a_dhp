import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Group} from "../shared/models/material.model";
import {Composition} from "../shared/models/composition.model";
import {CompositionService} from "../shared/services/composition.service";
import {NgbdModal2Content} from "./add-composition/add-composition.component";

@Component({
  selector: 'app-composition-page',
  templateUrl: './composition-page.component.html',
  styleUrls: ['./composition-page.component.scss']
})
export class CompositionPageComponent implements OnInit {

  compositions: Array<Composition>;
  filteredCompositions: Array<Composition>;
  groups: Array<Group>;

  closeResult: string;
  currentCompositionId: number;
  currentComposition: Composition;
  currentGroup: number = -1;
  isChecked: boolean = false;

  message: string = "";

  constructor(private compositionService: CompositionService, private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.compositionService.getComposition().subscribe((data: Array<Composition>)=>{
        this.compositions = data;
        this.filteredCompositions = this.compositions;
    });
    this.compositionService.getCompositionGroups().subscribe((data: Array<Group>)=>{
        this.groups = data;
    });
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }

  newCompositionAdded(composition: Composition){
    this.compositions.push(composition);
    this.message = `Добавлен рецепт ${composition.code} ${composition.name}`;
  }

  CompositionEdited(composition: Composition){
    let indx = this.findObj(composition.pk);
    this.compositions[indx] = composition;
    this.message = `Отредактирован рецепт ${composition.code} ${composition.name}`;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  openLg() {
    this.modalService.open(NgbdModal2Content, {
      size: 'lg'
    });
  }

  findObj(pk: number) :number{
    for (let m in this.compositions){
      if (this.compositions[m].pk == pk) return +m;
    }
    return -1;
  }

  openEditWin(pk: number, window: any){
    this.currentCompositionId = this.findObj(pk);
    this.currentComposition = this.compositions[this.currentCompositionId];
    this.open(window);
  }

  checkList(form: NgForm){
    this.isChecked = false;
    for (let v in form.value) {
      this.isChecked = this.isChecked || form.value[v];
    }
  }

  onSubmit(form: NgForm){
    this.message = 'Удалены рецепты: ';
    for (let v in form.value){
      if (form.value[v]){
        this.compositionService.deleteComposition(+v).subscribe((data: any) => {
          let index = this.findObj(+v);
          this.message += `${this.compositions[index].code} ${this.compositions[index].name}; `;
          this.compositions.splice(index, 1);
        });
      }
    }
  }

  applyFilter(){
    if (this.currentGroup == -1){
      this.filteredCompositions = this.compositions;
    }
    else this.filteredCompositions = this.compositions.filter((m: any)=>{
      return m.group.pk == this.currentGroup;
    });
  }

}
