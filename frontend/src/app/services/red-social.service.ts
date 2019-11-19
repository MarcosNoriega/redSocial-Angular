import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User, Album, Fotos } from '../interfaces/interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedSocialService {

  url = environment.apiUrl;
  public auth = true;
  header = new HttpHeaders({
    'X-Auth-Token': localStorage.getItem('token')
  });

  constructor(private http: HttpClient) { }

  loginUser(user: User) {
    return this.http.post(this.url + 'auth', user);
  }

  registrarUser(user: User) {
    return this.http.post(this.url + 'register', user);
  }

  getAlbumes() {
    return this.http.get(this.url + 'album', {headers: this.header});
  }

  actualizarAuth(auth: boolean) {
    this.auth = auth;
  }

  postAlbumes(album: Album) {
    return this.http.post(this.url + 'album/create', album, {headers: this.header})
    .pipe(map(res => {
      return res['album'];
    }));
  }

  deleteAlbum(id: string) {
    return this.http.delete(this.url + `album/delete/${id}`, {headers: this.header})
    .pipe(map(res => {
      return res['album'];
    }));
  }

  getAlbum(id: string) {
    return this.http.get(this.url + `album/show/${id}`, {headers: this.header});
  }

  getImagenes(id: string) {
    return this.http.get(this.url + `images/album/${id}`, {headers: this.header});
  }

  getAllImagenes() {
    return this.http.get(this.url + `images`, {headers: this.header});
  }

  subirFoto(Foto: Fotos) {
    const formData = new FormData();
    formData.append('nombre', Foto.nombre);
    formData.append('descripcion', Foto.descripcion);
    formData.append('imagen', Foto.imagen);

    return this.http.post(this.url + 'images/create', formData, {headers: this.header})
    .pipe(map(res => {
      return res['image'];
    }));
  }

  deleteFoto(id: string) {
    return this.http.delete(this.url + `images/delete/${id}`, {headers: this.header})
    .pipe(map(res => {
      return res['image'];
    }));
  }
}
