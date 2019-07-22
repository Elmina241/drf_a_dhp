import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";


import {BaseApi} from "../../../shared/core/base-api";
import {Sticker} from "../models/sticker.model";

@Injectable()
export class StickerService extends BaseApi{

  constructor(public http: HttpClient){
    super(http);
  }

  getStickers(): Observable<any>{
    return this.get('tables/stickers');
  }

  getParts(): Observable<any>{
    return this.get('tables/parts');
  }

  addSticker(sticker: Sticker): Observable<Sticker>{
    return this.post('tables/stickers/', sticker);
  }

  deleteSticker(stickerId: number): Observable<any>{
    return this.delete(`tables/stickers/${stickerId}`);
  }

  editSticker(sticker: Sticker): Observable<Sticker>{
    return this.put(`tables/stickers/${sticker.pk}/`, sticker);
  }

}
