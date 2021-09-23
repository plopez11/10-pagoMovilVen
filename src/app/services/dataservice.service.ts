import { Injectable } from '@angular/core';
import { Banco, Favorito } from '../interfaces/interface';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  bancos: Banco[] = [];
  favoritos: Favorito[] = [];

  constructor( private storage: Storage,
                private toast: ToastController) { }


  cargaBancos() {

    const bancos: any = [
        {
        codigo: '0102',
        nombre: 'Venezuela',
      },
  	  {
        codigo: '0104',
        nombre: 'Venezolano de Crédito',
      },
      {
        codigo: '0105',
        nombre: 'Mercantil',
      },
      {
        codigo: '0108',
        nombre: 'Provincial',
      },
    	{
        codigo: '0114',
        nombre: 'Bancaribe',
      },
    	{
        codigo: '0115',
        nombre: 'Exterior',
      },
      {
        codigo: '0116',
        nombre: 'Occidental de Descuento',
      },
      {
        codigo: '0128',
        nombre: 'Banco Caroní',
      },
      {
        codigo: '0134',
        nombre: 'Banesco',
      },
      {
        codigo: '0138',
        nombre: 'Banco Plaza',
      },
      {
        codigo: '0151',
        nombre: 'Fondo Comun',
      },
      {
        codigo: '0156',
        nombre: '100% Banco',
      },
      {
        codigo: '0157',
        nombre: 'Del Sur',
      },
      {
        codigo: '0163',
        nombre: 'Banco del Tesoro',
      },
      {
        codigo: '0166',
        nombre: 'Banco Agricola',
      },
      {
        codigo: '0168',
        nombre: 'BanCrecer',
      },
      {
        codigo: '0169',
        nombre: 'Mi Banco',
      },
      {
        codigo: '0172',
        nombre: 'Bancamiga',
      },
      {
        codigo: '0174',
        nombre: 'Banplus',
      },
      {
        codigo: '0175',
        nombre: 'Bicentenario',
      },
      {
        codigo: '0177',
        nombre: 'Banfanb',
      },
      {
        codigo: '0191',
        nombre: 'Bnc',
      }
    ];
    this.bancos = this.bancos = bancos;
  }

  
  async cargarFavoritos(){
    const favoritos: any =  await this.storage.get('Pagosfavoritos');
  
    if (favoritos) {
      this.favoritos = favoritos;
    } 
    return this.favoritos;
  }

  async guardarFavoritos(nuevoFav: Favorito) {
    const favoritos: any =  await this.storage.get('Pagosfavoritos');
  
    const existe = this.favoritos.find(fav => fav.nombre === nuevoFav.nombre);
    if (!existe) {
      this.favoritos.unshift(nuevoFav);
      this.storage.set('Pagosfavoritos', this.favoritos);
      this.presentToast('Agregado a favoritos', 'primary');
    }
  }

  async presentToast(mensaje: string, color: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 1500,
      position: 'bottom',
      // tslint:disable-next-line: object-literal-shorthand
      color: color
    });
    toast.present();
  }

  borrarFavorito( fav: Favorito) {
    this.favoritos = this.favoritos.filter( listaData => {
        return listaData.nombre !== fav.nombre;
    });
    this.storage.set('Pagosfavoritos', this.favoritos);
  }
}
