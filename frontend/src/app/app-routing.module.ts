import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AlbumesComponent } from './components/albumes/albumes.component';
import { AlbumComponent } from './components/album/album.component';
import { FotosComponent } from './components/fotos/fotos.component';

const routes: Routes = [
  {path: 'contenido', component: ContenidoComponent },
  {path: 'perfil', component: PerfilComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registrar', component: RegisterComponent},
  {path: 'albumes', component: AlbumesComponent},
  {path: 'album/:id', component: AlbumComponent},
  {path: 'fotos', component: FotosComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'contenido'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
