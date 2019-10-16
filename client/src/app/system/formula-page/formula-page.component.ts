import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Formula} from "../shared/models/formula.model";
import {FormulaService} from "../shared/services/formula.service";

@Component({
  selector: 'app-formula-page',
  templateUrl: './formula-page.component.html',
  styleUrls: ['./formula-page.component.scss']
})
export class FormulaPageComponent implements OnInit {

  formulas: Array<Formula>;

  closeResult: string;
  currentFormulaId: number;
  currentFormula: Formula;
  isChecked: boolean = false;

  message: string = "";

  constructor(private formulaService: FormulaService, private modalService: NgbModal) { }

  ngOnInit() {
    this.formulaService.getFormula().subscribe((data: Array<Formula>)=>{
        this.formulas = data;
    });
  }

  newFormulaAdded(formula: Formula){
    this.formulas.push(formula);
    this.message = `Добавлен состав ${formula.code} ${formula.name}`;
  }

  FormulaEdited(formula: Formula){
    let indx = this.findObj(formula.pk);
    this.formulas[indx] = formula;
    this.message = `Отредактирован состав ${formula.code} ${formula.name}`;
  }

  open(window: any) {
    this.modalService.open(window, {
      size: 'lg'
    });
  }

  findObj(pk: number) :number{
    for (let m in this.formulas){
      if (this.formulas[m].pk == pk) return +m;
    }
    return -1;
  }

  openEditWin(pk: number, window: any){
    this.currentFormulaId = this.findObj(pk);
    this.currentFormula = this.formulas[this.currentFormulaId];
    this.open(window);
  }

  checkList(form: NgForm){
    this.isChecked = false;
    for (let v in form.value) {
      this.isChecked = this.isChecked || form.value[v];
    }
  }

  onSubmit(form: NgForm){
    this.message = 'Удалены составы: ';
    for (let v in form.value){
      if (form.value[v]){
        this.formulaService.deleteFormula(+v).subscribe((data: any) => {
          let index = this.findObj(+v);
          this.message += `${this.formulas[index].code} ${this.formulas[index].name}; `;
          this.formulas.splice(index, 1);
        });
      }
    }
  }

}
