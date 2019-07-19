export class Cap {
  constructor(
    public code: string,
    public group_id: number,
    public form: string,
    public colour_id: number,
    public mat_id: number,
    public pk?: number
  ) {}
}

export class Group {
  constructor(
    public pk: number,
    public name: string,
  ){}
}


