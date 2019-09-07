import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';//importar estas tres
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{Casahogar} from '../models/registrohogar.interfaces'

@Injectable({
  providedIn: 'root'
})
export class RegistrohogarService {
  private hogarCollection: AngularFirestoreCollection<Casahogar>;
  private registro: Observable<Casahogar[]>;
  constructor(db:AngularFirestore) { 
    this.hogarCollection= db.collection<Casahogar>('fundaciones');
    this.registro= this.hogarCollection.snapshotChanges().pipe(map(
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
    return this.hogarCollection.doc<Casahogar>(id).valueChanges();
  }
  addRegistro(registro: Casahogar) {
    return this.hogarCollection.add(registro);
  }
  updateRegistro(registrom: Casahogar, id: string) {
    return this.hogarCollection.doc(id).update(registrom);
  }
}
