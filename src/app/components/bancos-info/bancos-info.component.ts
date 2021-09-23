import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DataserviceService } from '../../services/dataservice.service';
import { Banco } from '../../interfaces/interface';

@Component({
  selector: 'app-bancos-info',
  templateUrl: './bancos-info.component.html',
  styleUrls: ['./bancos-info.component.scss'],
})
export class BancosInfoComponent implements OnInit {

  bancos: Banco[] = [];

  constructor(private dataserviceService: DataserviceService,
              private popoverctrl:PopoverController ) { }

  ngOnInit() {
    this.dataserviceService.cargaBancos();
    this.bancos = this.dataserviceService.bancos;
  }

  onClick( bco: any) {
    this.popoverctrl.dismiss({item: bco});
  }

}
