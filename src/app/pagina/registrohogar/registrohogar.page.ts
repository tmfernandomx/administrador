import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController, LoadingController} from '@ionic/angular';
import { Casahogar } from 'src/app/models/registrohogar.interfaces';
import {RegistrohogarService } from '../../servicios/registrohogar.service';
// plugins
import {ImagePicker, ImagePickerOptions} from  '@ionic-native/image-picker/ngx';
import {AuthService} from '../../servicios/auth.service'


@Component({
  selector: 'app-registrohogar',
  templateUrl: './registrohogar.page.html',
  styleUrls: ['./registrohogar.page.scss'],
})
export class RegistrohogarPage implements OnInit {

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
  };
  registroID = null;

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private registrohogarservice: RegistrohogarService,
    private loadingController: LoadingController,
    private imagePicker: ImagePicker,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.registroID = this.route.snapshot.params.id;

  }

  seleccionarfoto() {

    const options: ImagePickerOptions = {
      quality: 60,
      outputType: 1,
      maximumImagesCount: 1
    };

    this.imagePicker.getPictures(options).then((results) => {
      for (let i = 0; i < results.length; i++) {
          // console.log('Image URI: ' + results[i]);
          this.hogar.logo = 'data:image/jpeg;base64,' + results;
      }
    }, (err) => {
      console.log( 'Error en selector', JSON.stringify(err));
     });
  }

  onSubtmitRegistro() {
      this.auth.registro(this.hogar.email,
        this.hogar.clave,
        this.hogar.descripcion,
        this.hogar.estado,
        this.hogar.municipio,
        this.hogar.nombre,
        this.hogar.telefono,
        this.hogar.ubicacion,
        this.hogar.logo).then(auth => {
      this.router.navigate(['tabs']);
      console.log(auth);
      }).catch(err => console.log(err));
  }
}
