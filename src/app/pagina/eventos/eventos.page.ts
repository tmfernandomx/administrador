import { Component, OnInit } from '@angular/core';
import{Eventos} from '../../models/eventos.interface';
import{EventosService} from '../../servicios/eventos.service';
import{AuthService} from "../../servicios/auth.service"
import { from } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  eventos: Array<Eventos> = new Array();
  id: any;

  constructor(private eventosService:EventosService,
              public authservice: AuthService,
              private loadingController: LoadingController) {
       console.log("Eventos:"+localStorage.getItem("id"));
       this.id = localStorage.getItem("id");
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.eventosService.getEventos().subscribe(res => {
      res.forEach(element => {
        if (element.idFundacion === this.id) {
          this.eventos.push(element);
        }
      });

      loading.dismiss();
    });
  }

  salirlogin(){
    this.authservice.salirlogin();
  }

  ionViewWillLeave(){
    console.log('nos vamos');
  }

}
