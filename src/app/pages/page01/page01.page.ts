import { Component, OnInit } from '@angular/core';
import { Banco, Pago, Favorito } from '../../interfaces/interface';
import { NgForm } from '@angular/forms';
import { SMS } from '@ionic-native/sms/ngx';
import { AlertController, IonButton } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { DataserviceService } from '../../services/dataservice.service';
import { PopoverController } from '@ionic/angular';
import { FavoritosInfoComponent } from 'src/app/components/favoritos-info/favoritos-info.component';
import { BancosInfoComponent } from '../../components/bancos-info/bancos-info.component';


@Component({
  selector: 'app-page01',
  templateUrl: './page01.page.html',
  styleUrls: ['./page01.page.scss'],
})
export class Page01Page implements OnInit {

  bancos: Banco[] = [];
  favoritos: Favorito[] = [];
  
     
  pago:  Pago = {
      cedula : '',
      celular  : '',
      codBco: '',
      monto: ''
  };

  mensaje: string = '';
  codBanco: string = '';
  banco: string = '';
  telefonoNum: string = '2662';
  montosep = [];
  montopag = '';
  monto = '';
  montoEnt = '';
  montoDec = '00';
  chkfavorito = false;
  nombre = '';
  favoritoTomado = false;


  constructor( private sms: SMS,
               private alert: AlertController,
               private toastController: ToastController,
               private clipboard: Clipboard,
               private dataserviceService: DataserviceService,
               private popoverController:PopoverController) { }

  ngOnInit() {
    
    this.dataserviceService.cargaBancos();
    this.dataserviceService.cargarFavoritos();
    this.bancos = this.dataserviceService.bancos;
    this.favoritos = this.dataserviceService.favoritos;
  }

  onSubmit(formu: NgForm) {
    if (!formu.invalid) {

      if (formu.invalid) {
        Object.values( formu.controls).forEach( control => {
          control.markAsTouched();
        });
        return;
      }
      
      this.monto = formu.form.value.monto;
      this.nombre = formu.form.value.nombre;
      this.montoEnt = this.monto.toString().replace('.',',');
      

      if (this.montoEnt.indexOf(',') > 0) {
          this.montosep = this.montoEnt.split(',');
        if (this.montosep[1].length < 2) {
          this.montoDec = this.montoEnt+'0';
          this.montopag = this.montoDec;
        } else {
          this.montopag = this.montoEnt;
        }
      } else {
        this.montopag = this.montoEnt + ',00';
      }     

     
      if (!this.favoritoTomado) {
        this.pago.celular = '0' + this.pago.celular;
      } 

      this.mensaje = `PAGAR ${this.pago.codBco} ${this.pago.celular} ${this.pago.cedula} ${this.montopag}`;
      
    }   
  }
  
  bancoSelec(event) {
    
   this.codBanco = event.detail.value.codigo;
   this.banco = event.detail.value.nombre;
  }

  alerta_copiar() {
    this.presentAlertCopiar('Esta Seguro de querer copiar este pago');
  }

  alerta_enviar() {
    this.presentAlertEnviar('Esta Seguro querer enviar este pago');
  }

  alerta_cancel() {
    this.presentAlertCancel('Esta Seguro de querer cancelar el pago');
  }

  async copiarSMS(mensaje: string) {

    this.copyClipboard(mensaje)
    
    if (this.chkfavorito) {
      this.agregarFavorito()
    }
    this.limpiar();
       
  }

  async enviarSMS(mensaje: string) { 

    if (this.chkfavorito) {
      this.agregarFavorito()
    }

    if (this.sms.send(this.telefonoNum, mensaje)) {
      this.presentToast('Mensaje Enviado...', 'primary');
      this.limpiar();
    } else {
      this.presentToast('No se pudo enviar el mensaje...', 'danger');
    }
        
  }

  async presentToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: 'bottom',
      // tslint:disable-next-line: object-literal-shorthand
      color: color
    });
    toast.present();
  }

  async presentAlertCopiar(message: string) {
    const alert = await this.alert.create({
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message,
      buttons: [
        {
          text: 'Ok!', handler: () => {this.copiarSMS(this.mensaje)}
        },
        {
          text: 'Cancelar!',
          role: 'Cancel',
          cssClass: 'rojo'
        },
      ]
    });
    await alert.present();
  }

  async presentAlertCancel(message: string) {
    const alert = await this.alert.create({
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message,
      buttons: [
        {
          text: 'Ok!', handler: () => {this.cancelar()}
        },
        {
          text: 'Cancelar!',
          role: 'Cancel',
          cssClass: 'rojo'
        },
      ]
    });
    await alert.present();
  }


  async presentAlertEnviar(message: string) {
    const alert = await this.alert.create({
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message,
      buttons: [
        {
          text: 'Ok!', handler: () => {this.enviarSMS(this.mensaje)}
        },
        {
          text: 'Cancelar!',
          role: 'Cancel',
          cssClass: 'rojo'
        },
      ]
    });
    await alert.present();
  }


  cancelar() {
    this.limpiar();

  }
  
  limpiar() {
    
    this.pago = {
      cedula : '',
      celular  : '',
      codBco: '',
      monto: ''
    };
    this.mensaje = '';
    this.codBanco = '';
    this.montosep = [];
    this.montopag = '';
    this.monto = '';
    this.montoEnt = '';
    this.montoDec = '00';
    this.banco = '';
    this.chkfavorito = false;
    this.nombre = '';
    this.favoritoTomado = false;
  }

  copyClipboard(mensaje: string) {
    this.clipboard.copy(mensaje);

    this.clipboard.paste().then(
       (resolve: string) => {
          this.presentToast('Mensaje Copiado...', 'primary');
        },
        (reject: string) => {
          this.presentToast('No se pudo copiar el mensaje...', 'danger');
        }
      );
    
    this.clipboard.clear();
  }

  agregarFavorito(){
    
    const favorito:  Favorito = {
      nombre : this.nombre,    
      cedula  : this.pago.cedula,
      codBco: this.pago.codBco,
      banco: this.banco,
      celular  : this.pago.celular,
    };

    this.dataserviceService.guardarFavoritos(favorito);

  }

  async libroFavoritos(ev: any) {
    const popover = await this.popoverController.create({
      component: FavoritosInfoComponent,
      event: ev,
      translucent: true,
      backdropDismiss: false
    });
    await popover.present();
    const { data } = await popover.onWillDismiss();
    this.limpiar();
    if (data.item === 'vacio') {
      this.favoritoTomado = false;
    } else {
      this.favoritoTomado = true;
      this.pago.cedula = data.item.cedula;
      this.pago.celular = data.item.celular;
      this.pago.codBco  = data.item.codBco;
      this.banco = data.item.banco;
    }
    
  }

  async Selbancos(ev: any) {
    const popover = await this.popoverController.create({
      component: BancosInfoComponent,
      event: ev,
      translucent: true,
      backdropDismiss: false
    });
    await popover.present();
    const { data } = await popover.onWillDismiss();
    this.pago.codBco = data.item.codigo;
    this.banco = data.item.nombre;
    
  }


  chkOnFav() {
    
  }
}
