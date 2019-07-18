import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import { SystemComponent } from "./system.component";
import {MaterialPageComponent} from "./material-page/material-page.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {CompositionPageComponent} from "./composition-page/composition-page.component";
import {FormulaPageComponent} from "./formula-page/formula-page.component";
import {StoragePageComponent} from "./storage-page/storage-page.component";
import {ComplexCompsPageComponent} from "./complex-comps-page/complex-comps-page.component";
import {PackingPageComponent} from "./packing-page/packing-page.component";

const routes: Routes = [
  {
    path: 'system', component: SystemComponent, children: [
      {path: 'material', component: MaterialPageComponent},
      {path: 'product', component: ProductPageComponent},
      {path: 'packing', component: PackingPageComponent},
      {path: 'composition', component: CompositionPageComponent},
      {path: 'formula', component: FormulaPageComponent},
      {path: 'storage', component: StoragePageComponent},
      {path: 'complex-comps', component: ComplexCompsPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
