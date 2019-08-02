import { Component, OnInit } from '@angular/core';
import{Eventos} from '../../models/eventos.interface';
import{EventosService} from '../../servicios/eventos.service';
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  eventos:Eventos[];
  constructor(private eventosService:EventosService) { 

  }

  ngOnInit() {
    this.eventosService.getEventos().subscribe(res => this.eventos=res)
  }

}
