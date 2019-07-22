import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Part, Sticker} from "../../shared/models/sticker.model";
import {Product} from "../../shared/models/product.model";
import {StickerService} from "../../shared/services/sticker.service";
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'app-add-sticker',
  templateUrl: './add-sticker.component.html',
  styleUrls: ['./add-sticker.component.scss']
})
export class AddStickerComponent implements OnInit {

  @Output() onStickerAdd = new EventEmitter<Sticker>();
  @Input() modal: NgbModalRef;
  products: Array<Product>;
  parts: Array<Part>;

  constructor(private stickerService: StickerService, private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProduct().subscribe((data: Array<Product>)=>{
        this.products = data;
    });
    this.stickerService.getParts().subscribe((data: Array<Part>)=>{
        this.parts = data;
    });
  }

  onSubmit(form: NgForm){
    const {code, product, part} = form.value;

    const sticker = new Sticker(code, product, part);

    this.stickerService.addSticker(sticker).subscribe((sticker: Sticker) => {
      form.reset();
      this.onStickerAdd.emit(sticker);
      this.modal.close('Save click');
    })
  }
}
