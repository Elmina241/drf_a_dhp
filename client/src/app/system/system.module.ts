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
    HeaderComponent
  ],
  providers: [
    MaterialService
  ]
})
export class SystemModule {}
