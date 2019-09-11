import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController, LoadingController} from '@ionic/angular';
import{Casahogar} from '../../models/registrohogar.interfaces'
//plugins
import{ImagePicker, ImagePickerOptions} from  '@ionic-native/image-picker/ngx';
import { CasahogarService } from 'src/app/servicios/casahogar.service';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {
  hogar: Casahogar = {
    descripcion: '',
    estado: '',
    logo: '',
    municipio: '',
    ubicacion: '',
    nombre: '',
    telefono: '',
    email: '',
    clave: ''
  }
  hogarID = null;


  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private _casahogar: CasahogarService,
    private loadingController: LoadingController,
    private imagePicker: ImagePicker
  ) {
    this.hogarID = localStorage.getItem('id');
  }


  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this._casahogar.getFundationById(this.hogarID).subscribe( data =>{
      console.log(data);
      this.hogar = data;
      loading.dismiss();
    });
  }

  onSubmit() {
    this.saveDataFundation();
  }

  async saveDataFundation() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });

    await loading.present();

    if(this.hogarID != null) {
      //uppdate
      this._casahogar.updateFundation(this.hogar, this.hogarID).then(() => {
          loading.dismiss();
          this.nav.navigateForward('/');
      });
    }else{
      this._casahogar.addFundation(this.hogar).then(()=>{
        loading.dismiss
        this.nav.navigateForward('/');
      })
    }
  }

}
