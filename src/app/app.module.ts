import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {BlockUIModule} from 'ng-block-ui';

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
  MatProgressSpinnerModule,
  MatStepperModule, MatProgressBarModule, MatButtonToggleModule
} from '@angular/material';
import {NguCarouselModule} from '@ngu/carousel';

// StarRating
import {StarRatingModule} from 'angular-star-rating';

// Charts
import {ChartsModule} from 'ng2-charts';
import {FusionChartsModule} from 'angular-fusioncharts';
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
import {NuevoDatosUsuarioComponent} from './_components/nuevo-datos-usuario/nuevo-datos-usuario.component';
import {
  BuscarRecetasComponent,
  BuscarRecetasFiltrosComponent
} from './_components/buscar-recetas/buscar-recetas.component';
import {ActividadFisicaComponent, ActividadOverviewComponent} from './_components/actividad-fisica/actividad-fisica.component';
import {InformacionRecetaComponent} from './_components/informacion-receta/informacion-receta.component';
import {ActividadLaboralComponent, ActividadLaboralInfoComponent} from './_components/actividad-laboral/actividad-laboral.component';
import {ListaComprasComponent} from './_components/lista-compras/lista-compras.component';
import {
  CargarRecetaIngeridaComponent,
  CargarRecetaIngeridaInfoComponent
} from './_components/cargar-receta-ingerida/cargar-receta-ingerida.component';
import {
  CargarRecetaNuevaComponent,
  CargarRecetaNuevaIngrerdienteComponent
} from './_components/cargar-receta-nueva/cargar-receta-nueva.component';
import {
  CargarRecetaCompletaComponent,
} from './_components/cargar-receta-completa/cargar-receta-completa.component';
import {
  DietasEspecialesComponent, IngredientePreferenciaComponent, PreferenciasComponent
} from './_components/preferencias/preferencias.component';
import {
  AbmCategoriasComponent,
  AbmCategoriasOtrasUnidadesComponent,
  AbmCategoriasIngredientesComponent
} from './_components/abm-categorias/abm-categorias.component';

// Views
import {LoginRegisterViewComponent} from './_views/login-register-view/login-register-view.component';
import {HeaderViewComponent} from './_views/header-view/header-view.component';
import {BuscadorViewComponent} from './_views/buscador-view/buscador-view.component';
import {
  VerMenuViewComponent,
  VerMenuCargarRecetaComponent,
  VerMenuConfirmRemComponent
} from './_views/ver-menu-view/ver-menu-view.component';
import {
  ModificarDatosViewComponent,
  ModificarDatosViewWarningComponent
} from './_views/modificar-datos-view/modificar-datos-view.component';
import {
  EvaluacionViewComponent,
  EvaluacionConfigComponent,
  EvaluacionHistorialComponent,
  EvaluacionSwitchComponent
} from './_views/evaluacion-view/evaluacion-view.component';
import {ListaComprasViewComponent} from './_views/lista-compras-view/lista-compras-view.component';
import {
  PantallaPrincipalViewComponent,
  PantallaPrincipalViewDisclaimerComponent
} from './_views/pantalla-principal-view/pantalla-principal-view.component';
import {FavoritosViewComponent} from './_views/favoritos-view/favoritos-view.component';
import {RecetasUsuarioViewComponent} from './_views/recetas-usuario-view/recetas-usuario-view.component';
import {RecetasAdministradorComponent} from './_views/recetas-administrador/recetas-administrador.component';
import {
  AgregarIngredienteViewComponent,
  AgregarIngredienteCategoriaComponent
} from './_views/agregar-ingrediente-view/agregar-ingrediente-view.component';
import {GestionUnidadesViewComponent} from './_views/gestion-unidades-view/gestion-unidades-view.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
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
    ModificarDatosViewWarningComponent,
    EvaluacionViewComponent,
    EvaluacionConfigComponent,
    EvaluacionHistorialComponent,
    EvaluacionSwitchComponent,
    ListaComprasViewComponent,
    CargarRecetaIngeridaComponent,
    CargarRecetaIngeridaInfoComponent,
    PantallaPrincipalViewComponent,
    FavoritosViewComponent,
    CargarRecetaNuevaComponent,
    CargarRecetaNuevaIngrerdienteComponent,
    CargarRecetaCompletaComponent,
    RecetasUsuarioViewComponent,
    RecetasAdministradorComponent,
    AgregarIngredienteViewComponent,
    BuscarRecetasFiltrosComponent,
    PreferenciasComponent,
    DietasEspecialesComponent,
    IngredientePreferenciaComponent,
    GestionUnidadesViewComponent,
    AbmCategoriasComponent,
    AbmCategoriasOtrasUnidadesComponent,
    AbmCategoriasIngredientesComponent,
    AgregarIngredienteCategoriaComponent,
    PantallaPrincipalViewDisclaimerComponent
  ],
  imports: [
    StarRatingModule.forRoot(),
    ReactiveFormsModule,
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
    FusionChartsModule,
    MatStepperModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    BlockUIModule.forRoot(),
    MatAutocompleteModule
  ],
  providers: [
    AuthGuard,
    LoginGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ActividadOverviewComponent,
    ActividadLaboralInfoComponent,
    ModificarDatosViewWarningComponent,
    VerMenuConfirmRemComponent,
    VerMenuCargarRecetaComponent,
    EvaluacionConfigComponent,
    EvaluacionHistorialComponent,
    EvaluacionSwitchComponent,
    CargarRecetaIngeridaInfoComponent,
    CargarRecetaNuevaIngrerdienteComponent,
    BuscarRecetasFiltrosComponent,
    DietasEspecialesComponent,
    IngredientePreferenciaComponent,
    AbmCategoriasOtrasUnidadesComponent,
    AgregarIngredienteCategoriaComponent,
    PantallaPrincipalViewDisclaimerComponent
  ]
})
export class AppModule {
}
