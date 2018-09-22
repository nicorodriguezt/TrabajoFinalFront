import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';

// Angular Material
import {
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatRadioModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule,
  MatCardModule,
  MatExpansionModule
} from '@angular/material';

// Guards
import {AuthGuard} from './_guards/auth.guard';
import {LoginGuard} from './_guards/login.guard';

// Components
import {AppComponent} from './app.component';
import {LoginComponent} from './_components/login/login.component';
import {RegistroComponent} from './_components/registro/registro.component';
import {MainMenuComponent} from './_components/main-menu/main-menu.component';
import {NuevoDatosUsuarioComponent} from './_components/nuevo-datos-usuario/nuevo-datos-usuario.component';
import {BuscarRecetasComponent} from './_components/buscar-recetas/buscar-recetas.component';
import {ActividadFisicaComponent, ActividadOverviewComponent} from './_components/actividad-fisica/actividad-fisica.component';

// Views
import {LoginRegisterViewComponent} from './_views/login-register-view/login-register-view.component';
import {HeaderViewComponent} from './_views/header-view/header-view.component';
import {ActividadLaboralComponent} from './_components/actividad-laboral/actividad-laboral.component';
import {BuscadorViewComponent} from './_views/buscador-view/buscador-view.component';
import {InformacionRecetaComponent} from './_components/informacion-receta/informacion-receta.component';
import { VerMenuViewComponent } from './_views/ver-menu-view/ver-menu-view.component';
import { ProximosMenuViewComponent } from './_views/proximos-menu-view/proximos-menu-view.component';
import { ListaComprasComponent } from './_components/lista-compras/lista-compras.component';
import { ModificarDatosViewComponent } from './_views/modificar-datos-view/modificar-datos-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    MainMenuComponent,
    NuevoDatosUsuarioComponent,
    BuscarRecetasComponent,
    LoginRegisterViewComponent,
    HeaderViewComponent,
    ActividadFisicaComponent,
    ActividadOverviewComponent,
    ActividadLaboralComponent,
    BuscadorViewComponent,
    InformacionRecetaComponent,
    VerMenuViewComponent,
    ProximosMenuViewComponent,
    ListaComprasComponent,
    ModificarDatosViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    MatCardModule
  ],
  providers: [AuthGuard, LoginGuard],
  bootstrap: [AppComponent],
  entryComponents: [ActividadFisicaComponent, ActividadOverviewComponent]
})
export class AppModule {
}
