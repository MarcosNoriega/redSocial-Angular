import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AlbumesComponent } from './components/albumes/albumes.component';
import { AlbumComponent } from './components/album/album.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { FotoComponent } from './components/foto/foto.component';
import { FotoEditComponent } from './components/foto-edit/foto-edit.component';
import { TarjetasComponent } from './components/tarjeta/tarjetas.component';
import { FavoritasComponent } from './components/favoritas/favoritas.component';

import { AuthGuard } from './auth.guard';
import { FotosUserComponent } from './components/fotos-user/fotos-user.component';
import { Tarjeta2Component } from './components/tarjeta2/tarjeta2.component';
import { PanelSegidoresComponent } from './components/panel-segidores/panel-segidores.component';
import { AlbumEditComponent } from './components/album-edit/album-edit.component';
import { SearchComponent } from './components/search/search.component';
@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    ContenidoComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    AlbumesComponent,
    AlbumComponent,
    FotosComponent,
    FotoComponent,
    FotoEditComponent,
    TarjetasComponent,
    FavoritasComponent,
    FotosUserComponent,
    Tarjeta2Component,
    PanelSegidoresComponent,
    AlbumEditComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
