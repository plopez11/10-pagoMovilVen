import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Page01PageRoutingModule } from './page01-routing.module';

import { Page01Page } from './page01.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Page01PageRoutingModule
  ],
  exports: [Page01Page],
  declarations: [Page01Page]
})
export class Page01PageModule {}
