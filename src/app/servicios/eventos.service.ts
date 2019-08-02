import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';//importar estas tres
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{Eventos} from '../models/eventos.interface'

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private eventoCollection: AngularFirestoreCollection<Eventos>;
  private event: Observable<Eventos[]>;
   constructor(db:AngularFirestore) {
     this.eventoCollection= db.collection<Eventos>('events');
     this.event= this.eventoCollection.snapshotChanges().pipe(map(
       actions => {
         return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return { id, ...data };
         });
       }
     ));
    }
    getEventos() {
     return this.event;
   }
   getEvento(id: string) {
     return this.eventoCollection.doc<Eventos>(id).valueChanges();
   }
 
   updateEvento(solicitud: Eventos, id: string) {
     return this.eventoCollection.doc(id).update(solicitud);
   }
 
   addEvento(solicitud: Eventos) {
     return this.eventoCollection.add(solicitud);
   }
   removeEvento(id: string) {
     return this.eventoCollection.doc(id).delete();
   }
 }
 