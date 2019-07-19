import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { SharedModule} from "../shared/shared.module";
import {SystemRoutingModule} from "./system-routing.module";
import { MaterialPageComponent } from './material-page/material-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { FormulaPageComponent } from './formula-page/formula-page.component';
import { CompositionPageComponent } from './composition-page/composition-page.component';
import { ComplexCompsPageComponent } from './complex-comps-page/complex-comps-page.component';
import { StoragePageComponent } from './storage-page/storage-page.component';
import {SystemComponent} from "./system.component";
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {MaterialService} from "./shared/services/material.service";
import {MomentPipe} from "./shared/pipes/moment.pipe";
import { AddMaterialComponent } from './material-page/add-material/add-material.component';
import { EditMaterialComponent } from './material-page/edit-material/edit-material.component';
import { PackingPageComponent } from './packing-page/packing-page.component';
import { CapsPageComponent } from './caps-page/caps-page.component';
import { BoxingPageComponent } from './boxing-page/boxing-page.component';
import { StickerPageComponent } from './sticker-page/sticker-page.component';
import { AddPackingComponent } from './packing-page/add-packing/add-packing.component';
import { EditPackingComponent } from './packing-page/edit-packing/edit-packing.component';
import { AddCapComponent } from './caps-page/add-cap/add-cap.component';
import { EditCapComponent } from './caps-page/edit-cap/edit-cap.component';
import { AddBoxingComponent } from './boxing-page/add-boxing/add-boxing.component';
import { EditBoxingComponent } from './boxing-page/edit-boxing/edit-boxing.component';
import { AddStickerComponent } from './sticker-page/add-sticker/add-sticker.component';
import { EditStickerComponent } from './sticker-page/edit-sticker/edit-sticker.component';
import {PackingService} from "./shared/services/packing.service";
import {CapService} from "./shared/services/cap.service";
import {BoxingService} from "./shared/services/boxing.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    MaterialPageComponent,
    ProductPageComponent,
    FormulaPageComponent,
    CompositionPageComponent,
    ComplexCompsPageComponent,
    StoragePageComponent,
    SystemComponent,
    SidebarComponent,
    HeaderComponent,
    MomentPipe,
    AddMaterialComponent,
    EditMaterialComponent,
    PackingPageComponent,
    CapsPageComponent,
    BoxingPageComponent,
    StickerPageComponent,
    AddPackingComponent,
    EditPackingComponent,
    AddCapComponent,
    EditCapComponent,
    AddBoxingComponent,
    EditBoxingComponent,
    AddStickerComponent,
    EditStickerComponent
  ],
  providers: [
    MaterialService,
    PackingService,
    BoxingService,
    CapService
  ]
})
export class SystemModule {}
