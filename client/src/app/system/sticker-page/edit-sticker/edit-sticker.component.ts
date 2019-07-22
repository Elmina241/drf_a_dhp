import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Cap} from "../../shared/models/cap.model";
import {Part, Sticker} from "../../shared/models/sticker.model";
import {Product} from "../../shared/models/product.model";
import {ProductService} from "../../shared/services/product.service";
import {StickerService} from "../../shared/services/sticker.service";

@Component({
  selector: 'app-edit-sticker',
  templateUrl: './edit-sticker.component.html',
  styleUrls: ['./edit-sticker.component.scss']
})
export class EditStickerComponent implements OnInit {

  @Output() onStickerEdit = new EventEmitter<Sticker>();
  @Input() modal: NgbModalRef;
  parts: Array<Part>;
  products: Array<Product>;
  @Input() currentSticker: Cap;

  constructor(private stickerService: StickerService, private productService: ProductService) { }

  ngOnInit() {
    this.stickerService.getParts().subscribe((data: Array<Part>)=>{
        this.parts = data;
    });
    this.productService.getProduct().subscribe((data: Array<Product>)=>{
        this.products = data;
    });
  }

  onSubmit(form: NgForm){
    const {e_code, e_product, e_part} = form.value;

    const sticker = new Sticker(e_code, e_product, e_part, this.currentSticker.pk);

    this.stickerService.editSticker(sticker).subscribe((sticker: Sticker) => {
      form.reset();
      this.onStickerEdit.emit(sticker);
      this.modal.close('Save click');
    })
  }

}
