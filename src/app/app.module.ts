import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './service/auth-interceptor';

/** Componentes */
import { AppComponent } from './app.component';
import { LayoutFullComponent } from './modulos/layout/layout-full/layout-full.component';
import { LayoutSimpleComponent } from './modulos/layout/layout-simple/layout-simple.component';
import { HeaderComponent } from './modulos/layout/layout-full/header/header.component';
import { SidebarComponent } from './modulos/layout/layout-full/sidebar/sidebar.component';
import { InicioComponent } from './modulos/layout/layout-full/inicio/inicio.component';
import { BreadcrumbComponent } from './modulos/layout/layout-full/breadcrumb/breadcrumb.component';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  declarations: [
    AppComponent,
    LayoutFullComponent,
    LayoutSimpleComponent,
    HeaderComponent,
    SidebarComponent,
    InicioComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    //Importación de enrutamiento
    RouterModule.forRoot(appRoutes, routerConfig),

  ],
  exports: [
    RouterModule,
    BreadcrumbComponent
  ],
  providers:
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

