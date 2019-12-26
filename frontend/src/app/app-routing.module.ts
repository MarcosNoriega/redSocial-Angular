import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AlbumesComponent } from './components/albumes/albumes.component';
import { AlbumComponent } from './components/album/album.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { FotoComponent } from './components/foto/foto.component';
import { FotoEditComponent } from './components/foto-edit/foto-edit.component';
import { FavoritasComponent } from './components/favoritas/favoritas.component';
import { AuthGuard } from './auth.guard';
import { FotosUserComponent } from './components/fotos-user/fotos-user.component';
import { PanelSegidoresComponent } from './components/panel-segidores/panel-segidores.component';
import { AlbumEditComponent } from './components/album-edit/album-edit.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: 'contenido', component: ContenidoComponent, canActivate: [AuthGuard]},
  {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
  {path: 'perfil/:id', component: PerfilComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registrar', component: RegisterComponent},
  {path: 'albumes', component: AlbumesComponent, canActivate: [AuthGuard]},
  {path: 'album/:id', component: AlbumComponent, canActivate: [AuthGuard]},
  {path: 'album/edit/:id', component: AlbumEditComponent, canActivate: [AuthGuard]},
  {path: 'fotos', component: FotosComponent, canActivate: [AuthGuard]},
  {path: 'foto/:id', component: FotoComponent, canActivate: [AuthGuard]},
  {path: 'foto/edit/:id', component: FotoEditComponent, canActivate: [AuthGuard]},
  {path: 'favoritas', component: FavoritasComponent, canActivate: [AuthGuard]},
  {path: 'fotos/:idUser', component: FotosUserComponent, canActivate: [AuthGuard]},
  {path: 'seguidores', component: PanelSegidoresComponent, canActivate: [AuthGuard]},
  {path: 'search/:termino', component: SearchComponent, canActivate: [AuthGuard]},
  {path: '**', pathMatch: 'full', redirectTo: 'contenido'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
