import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User, Album, Fotos, Comentario } from '../interfaces/interface';
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

  updateAlbum(id: string, album: Album) {
    return this.http.put(this.url + `album/update/${id}`, album, {headers: this.header})
    .pipe(map(res => {
      return res['album'];
    }));
  }

  getAlbum(id: string) {
    return this.http.get(this.url + `album/show/${id}`, {headers: this.header});
  }

  getImagenesAlbum(id: string) {
    return this.http.get(this.url + `images/album/${id}`, {headers: this.header});
  }

  getAllImagenes() {
    return this.http.get(this.url + `images`, {headers: this.header});
  }

  getImagenesUser(id: string) {
    return this.http.get(this.url + `images/user/${id}`, {headers: this.header});
  }

  getImagen(id: string) {
    return this.http.get(this.url + `image/${id}`, {headers: this.header});
  }

  subirFoto(Foto: Fotos) {
    const formData = new FormData();
    formData.append('nombre', Foto.nombre);
    formData.append('descripcion', Foto.descripcion);
    formData.append('imagen', Foto.imagen);
    formData.append('albumId', Foto.albumId);
    formData.append('publico', Foto.publico.toString());

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

  updateFoto(id: string, foto: Fotos) {
    return this.http.post(this.url + `images/edit/${id}`, foto, {headers: this.header});
  }

  postComentarios(comentario: Comentario) {
    return this.http.post(this.url + 'comment/create', comentario, {headers: this.header})
    .pipe(map(res => {
      return res['comment'];
    }));
  }

  getComentarios(id: string) {
    return this.http.get(this.url + `comments/${id}`, {headers: this.header});
  }

  getComengario(id: string) {
    return this.http.get(this.url + `comment/${id}`, {headers: this.header});
  }

  deleteComentario(id: string) {
    return this.http.delete(this.url + `comment/delete/${id}`, {headers: this.header})
    .pipe(map(res => {
      return res['comment'];
    }));
  }

  updateCommentario(id: string, comment: Comentario) {
    return this.http.post(this.url + `comment/update/${id}`, comment, {headers: this.header})
    .pipe(map(res => {
      return res['comment'];
    }));
  }

  Likes(imagenId: string) {
    return this.http.post(this.url + `likes/create`, {imagenId}, {headers: this.header})
    .pipe(map(res => {
      return res['image'];
    }));
  }

  getImagenesLikes() {
    return this.http.get(this.url + 'images/likes', {headers: this.header});
  }

  getLikes(id: string) {
    return this.http.get(this.url + `likes/${id}`, {headers: this.header});
  }

  getContenido() {
    return this.http.get(this.url + 'contenido', {headers: this.header});
  }

  getUser(id: string) {
    return this.http.get(this.url + `user/${id}`, {headers: this.header});
  }

  getThisUser() {
    return this.http.get(this.url + 'user', {headers: this.header});
  }

  getFotosTop5ViewsUser(id: string) {
    return this.http.get(this.url + `images/user/top5/${id}`, {headers: this.header});
  }

  getFotosPopularesUser(id: string) {
    return this.http.get(this.url + `images/user/populares/${id}`, {headers: this.header});
  }

  getSeguidores() {
    return this.http.get(this.url + 'seguidores', {headers: this.header});
  }

  getSiguiendo() {
    return this.http.get(this.url + 'siguiendo', {headers: this.header});
  }

  seguir(idUser: string, idSeguidor: string) {
    return this.http.post(this.url + 'seguidores/create', {idUser, idSeguidor}, {headers: this.header});
  }

  sigiendo(idUser: string, idSiguiendo: string) {
    return this.http.post(this.url + 'siguiendo/create', {idUser, idSiguiendo}, {headers: this.header});
  }

  dejarDeSeguir(idSiguiendo: string) {
    return this.http.delete(this.url + `siguiendo/delete/${idSiguiendo}`, {headers: this.header});
  }

  deleteSeguidor(idSiguidor: string) {
    return this.http.delete(this.url + `seguidores/delete/${idSiguidor}`, {headers: this.header});
  }

  verificarSiguiendo(idSiguiendo: string) {
    return this.http.get(this.url + `siguiendo/verify/${idSiguiendo}`, {headers: this.header});
  }

  searchImages(termino: string) {
    return this.http.get(this.url + `search/image/${termino}`, {headers: this.header});
  }

  searchUser(termino: string) {
    return this.http.get(this.url + `search/user/${termino}`, {headers: this.header});
  }
}
