import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { LoginComponent } from './_components/login/login.component';
import { MainMenuComponent } from './_components/main-menu/main-menu.component';
import { RegistroComponent} from './_components/registro/registro.component';
import { DatosUsuarioComponent} from './_components/datos-usuario/datos-usuario.component';
import { BuscarRecetasComponent} from './_components/buscar-recetas/buscar-recetas.component';

// Guard
import { AuthGuard} from './_guards/auth.guard';
import {LoginGuard} from './_guards/login.guard';
import {LoginRegisterViewComponent} from './_views/login-register-view/login-register-view.component';

const routes: Routes = [
  { path: 'login', component: LoginRegisterViewComponent, canActivate: [LoginGuard]},
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: 'main', component: MainMenuComponent, canActivate: [AuthGuard]},
  { path: 'registro', component: RegistroComponent, canActivate: [AuthGuard]},
  { path: 'datosUsuario', component: DatosUsuarioComponent, canActivate: [AuthGuard]},
  { path: 'buscador', component: BuscarRecetasComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
