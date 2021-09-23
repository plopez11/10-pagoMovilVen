import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Page01Page } from './page01.page';

const routes: Routes = [
  {
    path: '',
    component: Page01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Page01PageRoutingModule {}
