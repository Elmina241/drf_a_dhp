export class Material {
  constructor(
    public code: string,
    public name: string,
    public group: Group,
    public prefix: Prefix,
    public mark: string,
    public unit: Unit,
    public concentration: number
  ) {}
}

export class Group {
  constructor(
    public id: number,
    public name: string,
  ){}
}

export class Prefix {
  constructor(
    public id: number,
    public name: string,
  ){}
}

export class Unit {
  constructor(
    public id: number,
    public name: string,
  ){}
}


