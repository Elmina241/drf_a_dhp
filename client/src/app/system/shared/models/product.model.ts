export class Product {
  constructor(
    public code: string,
    public name: string,
    public group_id: number,
    public use_id: number,
    public option: string,
    public detail: string,
    public mark_id: number,
    public production_id: number,
    public pk?: number
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

export class Production {
  constructor(
    public composition_id: number,
    public compAmount: number,
    public compUnit_id: number,
    public container_id: number,
    public contAmount: number,
    public contUnit_id: number,
    public cap_id: number,
    public capAmount: number,
    public capUnit_id: number,
    public sticker_id: number,
    public stickerAmount: number,
    public stickerUnit_id: number,
    public boxing_id: number,
    public boxingAmount: number,
    public boxingUnit_id: number,
    public pk?: number,
  ) {}
}


