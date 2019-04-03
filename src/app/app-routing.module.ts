import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Guard
import { AuthGuard} from './_guards/auth.guard';
import {LoginGuard} from './_guards/login.guard';

// Componentes
import { LoginRegisterViewComponent} from './_views/login-register-view/login-register-view.component';
import { BuscadorViewComponent} from './_views/buscador-view/buscador-view.component';
import { ModificarDatosViewComponent} from './_views/modificar-datos-view/modificar-datos-view.component';
import { VerMenuViewComponent} from './_views/ver-menu-view/ver-menu-view.component';
import { EvaluacionViewComponent } from './_views/evaluacion-view/evaluacion-view.component';
import { ListaComprasViewComponent } from './_views/lista-compras-view/lista-compras-view.component';
import { PantallaPrincipalViewComponent} from './_views/pantalla-principal-view/pantalla-principal-view.component';
import {FavoritosViewComponent} from './_views/favoritos-view/favoritos-view.component';
import {RecetasUsuarioViewComponent} from './_views/recetas-usuario-view/recetas-usuario-view.component';
import {RecetasAdministradorComponent} from './_views/recetas-administrador/recetas-administrador.component';
import {AgregarIngredienteViewComponent} from './_views/agregar-ingrediente-view/agregar-ingrediente-view.component';

const routes: Routes = [
  { path: 'login', component: LoginRegisterViewComponent, canActivate: [LoginGuard] },
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: 'main', component: PantallaPrincipalViewComponent, canActivate: [AuthGuard] },
  { path: 'buscador', component: BuscadorViewComponent, canActivate: [AuthGuard] },
  { path: 'cargarDatos', component: ModificarDatosViewComponent, canActivate: [AuthGuard] },
  { path: 'verMenu', component: VerMenuViewComponent, canActivate: [AuthGuard] },
  { path: 'evaluacion', component: EvaluacionViewComponent, canActivate: [AuthGuard] },
  { path: 'listaCompras', component: ListaComprasViewComponent, canActivate: [AuthGuard] },
  { path: 'favoritos', component: FavoritosViewComponent, canActivate: [AuthGuard]},
  { path: 'recetasUsuario', component: RecetasUsuarioViewComponent, canActivate: [AuthGuard]},
  { path: 'recetasAdmin', component: RecetasAdministradorComponent, canActivate: [AuthGuard]},
  { path: 'ingredientes', component: AgregarIngredienteViewComponent, canActivate: [AuthGuard]}
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
