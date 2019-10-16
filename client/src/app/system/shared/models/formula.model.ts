import {Material} from "./material.model";
import {Composition} from "./composition.model";

export class Formula {
  constructor(
    public code: string,
    public name: string,
    public components_set: Array<FormulaComponent>,
    public cur_batch: number,
    public pk?: number,
    public composition?: Composition,
  ) {}
}

export class FormulaComponent {
  constructor(
    public mat_id: number,
    public amount: number,
    public mat?: Material,
    public pk?: number
  ){}
}
