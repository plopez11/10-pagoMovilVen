import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FavoritosInfoComponent } from './favoritos-info/favoritos-info.component';
import { BancosInfoComponent } from './bancos-info/bancos-info.component';

@NgModule({
  declarations: [FavoritosInfoComponent, BancosInfoComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [
    FavoritosInfoComponent, BancosInfoComponent
  ]
})
export class ComponentsModule { }
