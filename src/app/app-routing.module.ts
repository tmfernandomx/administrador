import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import{AuthGuard} from "./guards/auth.guard"
import{NoGuard} from "./guards/no.guard"
const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'eventos', loadChildren: './pagina/eventos/eventos.module#EventosPageModule' },
  { path: 'infoeventos/:id', loadChildren: './pagina/infoeventos/infoeventos.module#InfoeventosPageModule' },
  { path: 'infoeventos', loadChildren: './pagina/infoeventos/infoeventos.module#InfoeventosPageModule' },
  { path: 'registromascota', loadChildren: './pagina/registromascota/registromascota.module#RegistromascotaPageModule'},
  { path: 'registromascota', loadChildren: './pagina/registromascota/registromascota.module#RegistromascotaPageModule' },
  { path: 'registromascotainformacion/:id', loadChildren: './pagina/registromascotainformacion/registromascotainformacion.module#RegistromascotainformacionPageModule' },
  { path: 'registromascotainformacion', loadChildren: './pagina/registromascotainformacion/registromascotainformacion.module#RegistromascotainformacionPageModule' },
  { path: 'registrohogar', loadChildren: './pagina/registrohogar/registrohogar.module#RegistrohogarPageModule', canActivate:[NoGuard ]},
  { path: 'registrohogarinformacion', loadChildren: './pagina/registrohogarinformacion/registrohogarinformacion.module#RegistrohogarinformacionPageModule', },
  { path: 'tabs', loadChildren: './pagina/tabs/tabs.module#TabsPageModule', canActivate:[AuthGuard ]},
  { path: 'inicio', loadChildren: './pagina/inicio/inicio.module#InicioPageModule', canActivate:[NoGuard ] },
  { path: 'miperfil', loadChildren: './pagina/miperfil/miperfil.module#MiperfilPageModule' },
  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
