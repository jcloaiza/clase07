import { Route, RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modulos/layout/layout-full/inicio/inicio.component';
import { LayoutFullComponent } from './modulos/layout/layout-full/layout-full.component';
import { LayoutSimpleComponent } from './modulos/layout/layout-simple/layout-simple.component';



export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: LayoutSimpleComponent,
    children: [
      { path: '', loadChildren: () => import('src/app/modulos/auth/auth.module').then(m => m.AuthModule) }  
    ]
  },
  {
    path: '',
    component: LayoutFullComponent,
    children: [
      { path: '', loadChildren: () => import('src/app/modulos/maestros/maestros.module').then(m => m.MaestrosModule) },
      { path: '', loadChildren: () => import('src/app/modulos/consultas/consultas.module').then(m => m.ConsultasModule) } , 
      { path: 'home', component: InicioComponent }    
    ]
  }
];
