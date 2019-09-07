import { Component, OnInit } from '@angular/core';
import{Registromascota} from '../../models/registromascota.interfaces'
import{RegistromascotraService} from '../../servicios/registromascotra.service'

@Component({
  selector: 'app-registromascota',
  templateUrl: './registromascota.page.html',
  styleUrls: ['./registromascota.page.scss'],
})
export class RegistromascotaPage implements OnInit {
  registros:Registromascota[];
  constructor(private registromascota: RegistromascotraService) 
  { }

  ngOnInit() {
    this.registromascota.getRegistros().subscribe(res => this.registros=res)
  }

}
