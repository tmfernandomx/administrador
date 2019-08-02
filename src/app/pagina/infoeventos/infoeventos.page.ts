import { Component, OnInit } from '@angular/core';

import{EventosService} from '../../servicios/eventos.service';
import {ActivatedRoute} from '@angular/router';
import {NavController, LoadingController} from '@ionic/angular';
import { Eventos } from '../../models/eventos.interface';
//plugins
import{ImagePicker, ImagePickerOptions} from  '@ionic-native/image-picker/ngx';
@Component({
  selector: 'app-infoeventos',
  templateUrl: './infoeventos.page.html',
  styleUrls: ['./infoeventos.page.scss'],
})
export class InfoeventosPage implements OnInit {
evento: Eventos={
    imagen:'',
    nombre:'',
    fecha:''
  }
  eventoID=null;
  constructor(private route: ActivatedRoute, 
    private nav: NavController,
    private eventosService: EventosService,
    private loadingController: LoadingController,
    private imagePicker: ImagePicker
    ) { }

    ngOnInit() {
      this.eventoID= this.route.snapshot.params['id'];
      if(this.eventoID){
        this.loadLista();
      }
    }

    async loadLista(){
      const loading = await this.loadingController.create({
        message:'Cargando...'
      });
      await loading.present();
      this.eventosService.getEvento(this.eventoID).subscribe(res =>{
        loading.dismiss();
        this.evento = res;
      });
    }
    async saveTodo(){
      const loading=await this.loadingController.create({
        message:'Guardando....'
      });
      await loading.present();
    
      if(this.eventoID){
        //uppdate
    
        this.eventosService.updateEvento(this.evento, this.eventoID).then(() =>{
            loading.dismiss();
            this.nav.navigateForward('/');
        });
    
      }else{
        //add new
    
    
        this.eventosService.addEvento(this.evento).then(() =>{
          loading.dismiss();
          this.nav.navigateForward('/');
      });
      }
    
    }
    onRemove(idEvento: string){
      this.eventosService.removeEvento(idEvento);
    
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
            this.evento.imagen = 'data:image/jpeg;base64,' + results;
        }
      }, (err) => {
        console.log( "Error en selector", JSON.stringify(err));
       });
    }
    
  } 
