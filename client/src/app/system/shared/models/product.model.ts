export class Product {
  constructor(
    public code: string,
    public name: string,
    public group_id: number,
    public use_id: number,
    public option: string,
    public detail: string,
    public mark_id: number,
    public pk?: number,
    public production_id?: number
  ) {}
}

export class Group {
  constructor(
    public pk: number,
    public name: string,
  ){}
}

export class Use {
  constructor(
    public pk: number,
    public name: string,
  ){}
}

export class Mark {
  constructor(
    public pk: number,
    public name: string,
  ){}
}


