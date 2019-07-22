export class Sticker {
  constructor(
    public code: string,
    public product_id: number,
    public part_id: number,
    public pk?: number
  ) {}
}

export class Part {
  constructor(
    public pk: number,
    public name: string,
  ){}
}


