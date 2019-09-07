import { Injectable } from '@angular/core';
import{ AngularFireAuth} from "@angular/fire/auth";
import { promise } from 'protractor';
import{Router} from "@angular/router"
import{AngularFirestore} from "@angular/fire/firestore"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private AFauth: AngularFireAuth,
     private router: Router,
     private db:AngularFirestore
     ) {}

  login(email:string, password: string){

    return new Promise((resolve, rejected)=>{

      this.AFauth.auth.signInWithEmailAndPassword(email,password).then(user =>{
        console.log(user.user.uid);
        localStorage.setItem("id", user.user.uid);
        resolve(user);
      }).catch(err =>rejected(err)); 
    });


  }
  salirlogin(){
    this.AFauth.auth.signOut().then(()=>{
      this.router.navigate(['/inicio']);
    });
  }
   registro(email:string, password: string, descripcion:string,
   estado:string,
   logo:string,
   municipio:string,
   ubicacion:string,
   nombre:string,
   telefono:string,){
     return new Promise((resolve, reject)=>{
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(res=>{
        console.log(res.user.uid)
        const uid=res.user.uid;
       this.db.collection('fundaciones').doc(uid).set({
        email:email,
        descripcion: descripcion,
        estado:estado,
        logo:logo,
        municipio:municipio,
        ubicacion:ubicacion,
        nombre: nombre,
        telefono: telefono,
        uid:uid, 


       })
        resolve(res)
      }).catch(err=> reject(err))
     })
  
   }
}
