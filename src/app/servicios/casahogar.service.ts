import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Casahogar } from '../models/registrohogar.interfaces';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasahogarService {

  private fundacionCollection: AngularFirestoreCollection<Casahogar>;
  private fundaciones: Observable<Casahogar[]>;

  constructor(db: AngularFirestore) {
    this.fundacionCollection = db.collection<Casahogar>('fundaciones');

    this.fundaciones = this.fundacionCollection.snapshotChanges().pipe(map( actions => {
      return actions.map(a =>{
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }
    ));
  }

  getFundations() {
    return this.fundaciones;
  }

  getFundationById(id: string) {
    return this.fundacionCollection.doc<Casahogar>(id).valueChanges();
  }

  updateFundation(fundation: Casahogar, id: string) {
    return this.fundacionCollection.doc(id).update(fundation);
  }

  addFundation(fundation: Casahogar) {
    return this.fundacionCollection.add(fundation);
  }

  removeFundation(id: string) {
    return this.fundacionCollection.doc(id).delete();
  }

}
