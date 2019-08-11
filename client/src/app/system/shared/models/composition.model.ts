import {Material} from "./material.model";

export class Composition {
  constructor(
    public code: string,
    public name: string,
    public group_id: number,
    public sgr: string, //Свидетельство о государственной регистрации
    public sh_life: string, //Срок годности
    public date: string, //Дата СГР
    public comp_package: string, //Упаковка
    public standard: string, //Требования качества продукции
    public certificate: string, //Сертификат соответствия
    public declaration: string, //Декларация о соответствии
    public components: Array<CompComponent>,
    public form: number, //Паста, Гель и т д
    public isFinal: boolean, //технологическая или нет?
    public pk?: number
  ) {}
}

export class Group {
  constructor(
    public pk: number,
    public name: string,
  ){}
}

export class ProductForm {
  constructor(
    public pk: number,
    public name: string,
  ){}
}

export class CompComponent {
  constructor(
    public pk: number,
    public mat_id: number,
    public min: number,
    public max: number
  ){}
}
