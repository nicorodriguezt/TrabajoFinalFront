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
  MatExpansionModule,
  MatTooltipModule,
  MatTableModule,
  MatSnackBarModule,
  MatTabsModule,
  MatCheckboxModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { NguCarouselModule} from '@ngu/carousel';

// Charts
import { ChartsModule } from 'ng2-charts';
import { FusionChartsModule} from 'angular-fusioncharts';
import * as Widgets from 'fusioncharts/fusioncharts.widgets';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import * as PowerCharts from 'fusioncharts/fusioncharts.powercharts';
FusionChartsModule.fcRoot(FusionCharts, Charts, Widgets, FusionTheme, PowerCharts);

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
import {InformacionRecetaComponent} from './_components/informacion-receta/informacion-receta.component';
import {ActividadLaboralComponent, ActividadLaboralInfoComponent} from './_components/actividad-laboral/actividad-laboral.component';
import {ListaComprasComponent} from './_components/lista-compras/lista-compras.component';
import {CargarRecetaIngeridaComponent,
  CargarRecetaIngeridaInfoComponent } from './_components/cargar-receta-ingerida/cargar-receta-ingerida.component';

// Views
import {LoginRegisterViewComponent} from './_views/login-register-view/login-register-view.component';
import {HeaderViewComponent} from './_views/header-view/header-view.component';
import {BuscadorViewComponent} from './_views/buscador-view/buscador-view.component';
import {
  VerMenuViewComponent,
  VerMenuCargarRecetaComponent,
  VerMenuConfirmRemComponent
} from './_views/ver-menu-view/ver-menu-view.component';
import {ModificarDatosViewComponent} from './_views/modificar-datos-view/modificar-datos-view.component';
import {RecetasFavoritasViewComponent} from './_views/recetas-favoritas-view/recetas-favoritas-view.component';
import {
  EvaluacionViewComponent,
  EvaluacionConfigComponent,
  EvaluacionHistorialComponent,
  EvaluacionSwitchComponent
} from './_views/evaluacion-view/evaluacion-view.component';
import { ListaComprasViewComponent } from './_views/lista-compras-view/lista-compras-view.component';



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
    ActividadLaboralInfoComponent,
    BuscadorViewComponent,
    InformacionRecetaComponent,
    VerMenuViewComponent,
    VerMenuCargarRecetaComponent,
    VerMenuConfirmRemComponent,
    ListaComprasComponent,
    ModificarDatosViewComponent,
    RecetasFavoritasViewComponent,
    EvaluacionViewComponent,
    EvaluacionConfigComponent,
    EvaluacionHistorialComponent,
    EvaluacionSwitchComponent,
    ListaComprasViewComponent,
    CargarRecetaIngeridaComponent,
    CargarRecetaIngeridaInfoComponent
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
    MatCardModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    NguCarouselModule,
    MatTableModule,
    ChartsModule,
    FusionChartsModule
  ],
  providers: [
    AuthGuard,
    LoginGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ActividadOverviewComponent,
    ActividadLaboralInfoComponent,
    VerMenuConfirmRemComponent,
    VerMenuCargarRecetaComponent,
    EvaluacionConfigComponent,
    EvaluacionHistorialComponent,
    EvaluacionSwitchComponent,
    CargarRecetaIngeridaInfoComponent
  ]
})
export class AppModule {
}
