import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { promise } from 'protractor';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth,
              private router: Router,
              private db: AngularFirestore
     ) {}

  login(email: string, password: string) {
    return new Promise((resolve, rejected) => {

      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        console.log(user.user.uid);
        localStorage.setItem('id', user.user.uid);
        resolve(user);
      }).catch(err => rejected(err));
    });


  }
  salirlogin() {
    this.AFauth.auth.signOut().then(() => {
      location.assign('/tabs');
    });
  }

  registro(email: string,
           clave: string,
           descripcion: string,
           estado: string,
           municipio: string,
           nombre: string,
           telefono: string,
           ubicacion: string,
           logo: string) {
     return new Promise((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, clave).then(res => {
        console.log(res.user.uid);
        localStorage.setItem('id', res.user.uid);
        const uid = res.user.uid;
        if(logo === '') {
          // tslint:disable-next-line: max-line-length
          logo = 'https://firebasestorage.googleapis.com/v0/b/woofapp-78c4e.appspot.com/o/pit.jpg?alt=media&token=ea706358-efd2-4038-a6ba-605b1208aabb';
        }
        this.db.collection('fundaciones').doc(uid).set({
        email,
        clave,
        descripcion,
        estado,
        logo,
        municipio,
        ubicacion,
        nombre,
        telefono,
        uid
      });
        resolve(res);
      }).catch(err => reject(err));
     });

   }
}
