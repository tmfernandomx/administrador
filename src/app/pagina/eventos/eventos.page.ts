import { Component, OnInit } from '@angular/core';
import{Eventos} from '../../models/eventos.interface';
import{EventosService} from '../../servicios/eventos.service';
import{AuthService} from "../../servicios/auth.service"
import { from } from 'rxjs';
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  eventos:Eventos[];
  constructor(private eventosService:EventosService,
              public authservice: AuthService) { 

  }

  ngOnInit() {
    this.eventosService.getEventos().subscribe(res => this.eventos=res)
  }
  salirlogin(){
    this.authservice.salirlogin();
  }
  
}
