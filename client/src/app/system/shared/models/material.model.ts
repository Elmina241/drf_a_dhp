export class Material {
  constructor(
    public code: string,
    public name: string,
    public group_id: number,
    public prefix_id: number,
    public mark: string,
    public unit_id: number,
    public concentration: number,
    public pk?: number
  ) {}
}

export class Group {
  constructor(
    public pk: number,
    public name: string,
  ){}
}

export class Prefix {
  constructor(
    public pk: number,
    public name: string,
  ){}
}

export class Unit {
  constructor(
    public pk: number,
    public name: string,
  ){}
}


