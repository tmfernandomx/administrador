import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'tab2'
  },

  {
    path: '',
    component: TabsPage,
    children: [
      {
        path:'tab1',
        loadChildren: '../miperfil/miperfil.module#MiperfilPageModule'
      },
      {
        path:'tab2',
        loadChildren: '../eventos/eventos.module#EventosPageModule'
      },
      {
        path:'tab3',
        loadChildren: '../registromascota/registromascota.module#RegistromascotaPageModule'
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
