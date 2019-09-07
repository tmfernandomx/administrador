import { Component, OnInit } from '@angular/core';
import{  AuthService} from "../../servicios/auth.service"
import{Router} from "@angular/router"
import { from } from 'rxjs';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  email:string;
  password: string;
  constructor(private authservices: AuthService, public router:Router) { }

  ngOnInit() {
  }
  onSubmitlogin(){
    this.authservices.login(this.email, this.password).then(res=>{

      this.router.navigate(['/tabs'])
    }).catch(res=> alert('los datos son incorrectos o no existe el usuario'))

  }
  onSubmitTemple(){
    console.log('form submit');
  }
}
