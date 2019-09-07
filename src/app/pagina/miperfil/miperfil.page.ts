import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController, LoadingController} from '@ionic/angular';
import{Casahogar} from '../../models/registrohogar.interfaces'
import{RegistrohogarService}from '../../servicios/registrohogar.service'
//plugins
import{ImagePicker, ImagePickerOptions} from  '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {
  hogar: Casahogar={
    
    descripcion:'',
    estado:'',
    logo:'',
    municipio:'',
    ubicacion:'',
    nombre:'',
    telefono:'',
    correo:'',
    clave:'',
  }
  hogarID=null;
  

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController,
    private hogarService: RegistrohogarService,
    private loadingController: LoadingController,
    private imagePicker: ImagePicker
  ) { 

  }

 
  ngOnInit() {
    this.hogarID= this.route.snapshot.params['id'];
    if(this.hogarID){
      this.loadLista();
    }
  }
  
  async loadLista(){
    const loading = await this.loadingController.create({
      message:'Cargando...'
    });
    await loading.present();
    this.hogarService.getRegistro(this.hogarID).subscribe(res =>{
      loading.dismiss();
      this.hogar = res;
    });
  }
  async saveTodo(){
    const loading=await this.loadingController.create({
      message:'Guardando....'
    });
    await loading.present();
  
    if(this.hogarID){
      //uppdate
  
      this.hogarService.updateRegistro(this.hogar, this.hogarID).then(() =>{
          loading.dismiss();
          this.nav.navigateForward('/');
      });
  
    }else{
      //add new
  
  
      this.hogarService.addRegistro(this.hogarID).then(() =>{
        loading.dismiss();
        this.nav.navigateForward('/');
    });
    }
  
  }

}
