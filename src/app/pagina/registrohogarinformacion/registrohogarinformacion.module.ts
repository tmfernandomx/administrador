import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegistrohogarinformacionPage } from './registrohogarinformacion.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrohogarinformacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegistrohogarinformacionPage]
})
export class RegistrohogarinformacionPageModule {}
