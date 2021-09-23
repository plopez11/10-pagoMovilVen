import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DataserviceService } from '../../services/dataservice.service';
import { Favorito } from '../../interfaces/interface';
import { IonList } from '@ionic/angular';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-favoritos-info',
  templateUrl: './favoritos-info.component.html',
  styleUrls: ['./favoritos-info.component.scss'],
})
export class FavoritosInfoComponent implements OnInit {

  lista: Observable<any>;
  @ViewChild( IonList ) IonList: IonList;
  favoritos: Favorito[] = [];
  listaFav: any[] = [];
  
  
  constructor(private popoverctrl:PopoverController,
              private dataserviceService: DataserviceService) { }

  ngOnInit() {
      
    const lista: any = this.dataserviceService.cargarFavoritos();
    
    this.dataserviceService.cargarFavoritos().then(Response =>{
      this.favoritos = Response;     
    });

  }

  onClick( fav: any) {
    this.popoverctrl.dismiss({item: fav});
  }

  borrarFav( fav: Favorito) {
    
    this.dataserviceService.borrarFavorito(fav);
    this.IonList.closeSlidingItems();
    this.onClick('vacio');
    

  }


}
