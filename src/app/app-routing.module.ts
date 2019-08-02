import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'eventos', pathMatch: 'full' },
  { path: 'eventos', loadChildren: './pagina/eventos/eventos.module#EventosPageModule' },
  { path: 'infoeventos/:id', loadChildren: './pagina/infoeventos/infoeventos.module#InfoeventosPageModule' },
  { path: 'infoeventos', loadChildren: './pagina/infoeventos/infoeventos.module#InfoeventosPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
