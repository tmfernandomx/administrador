import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';//importar estas tres
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{Registromascota} from '../models/registromascota.interfaces'
@Injectable({
  providedIn: 'root'
})
export class RegistromascotraService {
  private registromascotaCollection: AngularFirestoreCollection<Registromascota>;
  private registro: Observable<Registromascota[]>;
  constructor(db:AngularFirestore) { 
     this.registromascotaCollection= db.collection<Registromascota>('catalogos');
  this.registro= this.registromascotaCollection.snapshotChanges().pipe(map(
    actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }
  ));
  }
  getRegistros() {
    return this.registro;
  }
  getRegistro(id: string) {
    return this.registromascotaCollection.doc<Registromascota>(id).valueChanges();
  }

  updateRegistro(registrom: Registromascota, id: string) {
    return this.registromascotaCollection.doc(id).update(registrom);
  }

  addRegistro(registrom: Registromascota) {
    return this.registromascotaCollection.add(registrom);
  }
  removeRegistro(id: string) {
    return this.registromascotaCollection.doc(id).delete();
  }
}
