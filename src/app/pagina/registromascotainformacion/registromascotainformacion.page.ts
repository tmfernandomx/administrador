import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController, LoadingController} from '@ionic/angular';
import { Registromascota } from '../../models/registromascota.interfaces';
import{RegistromascotraService} from '../../servicios/registromascotra.service'
//plugins
import{ImagePicker, ImagePickerOptions} from  '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-registromascotainformacion',
  templateUrl: './registromascotainformacion.page.html',
  styleUrls: ['./registromascotainformacion.page.scss'],
})
export class RegistromascotainformacionPage implements OnInit {
  registro: Registromascota={
    foto: '',
    nombre: '',
    genero:'',
    edad:'',
    raza:'',
    ragos:'',
    historia:'',
    fundacion:'',
    datosmedicos: '',

  }
  registroID=null;
  constructor(
    private route: ActivatedRoute, 
    private nav: NavController,
    private registromascotaService: RegistromascotraService,
    private loadingController: LoadingController,
    private imagePicker: ImagePicker
  ) { 

  }

  ngOnInit() {
    this.registroID= this.route.snapshot.params['id'];
      if(this.registroID){
        this.loadLista();
      }
  }
  async loadLista(){
    const loading = await this.loadingController.create({
      message:'Cargando...'
    });
    await loading.present();
    this.registromascotaService.getRegistro(this.registroID).subscribe(res =>{
      loading.dismiss();
      this.registro = res;
    });
  }
  async saveTodo(){
    const loading=await this.loadingController.create({
      message:'Guardando....'
    });
    await loading.present();
  
    if(this.registroID){
      //uppdate
  
      this.registromascotaService.updateRegistro(this.registro, this.registroID).then(() =>{
          loading.dismiss();
          this.nav.navigateForward('/');
      });
  
    }else{
      //add new
  
  
      this.registromascotaService.addRegistro(this.registro).then(() =>{
        loading.dismiss();
        this.nav.navigateForward('/');
    });
    }
  
  }
  onRemove(idEvento: string){
    this.registromascotaService.removeRegistro(idEvento);
  
  }
  seleccionarfoto(){

    let options:ImagePickerOptions = {
      quality: 60,
      outputType: 1,
      maximumImagesCount: 1
    }
  
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          //console.log('Image URI: ' + results[i]);
          this.registro.foto = 'data:image/jpeg;base64,' + results;
      }
    }, (err) => {
      console.log( "Error en selector", JSON.stringify(err));
     });
  }

}
  