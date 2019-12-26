import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RedSocialService } from 'src/app/services/red-social.service';
import { Fotos, Comentario, User } from '../../interfaces/interface';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styles: []
})
export class FotoComponent implements OnInit {

  IdUserSesion = '';

  foto: Fotos = {
    _id: '',
    nombre: '',
    descripcion: '',
    albumId: '',
    userId: '',
    ruta: '',
    likes: 0,
    imagen: null,
    publico: false,
    views: 0
  };
  comentario: Comentario = {
    _id: '',
    comentario: '',
    user_id: '',
    imagen_id: '',
    gravatar: '',
  };

  comentarioParaEditar: Comentario = {
    _id: '',
    comentario: '',
    user_id: '',
    imagen_id: '',
    gravatar: '',
  };

  idUser = '';

  user: User = {
    _id: '',
    name: '',
    surname: '',
    mail: '',
    password: '',
    seguidores: 0
  };

  Liked = false;
  loading = true;

  comentarios: Comentario[] = [];

  constructor(private activatedRouter: ActivatedRoute, private redSocial: RedSocialService) {
    activatedRouter.params.subscribe(params => {

      this.comentario.imagen_id = params['id'];

      redSocial.getImagen(params['id']).subscribe((res: Fotos) => {
        this.foto = res;
        this.idUser = res.userId;
        console.log(this.idUser);
      });

      redSocial.getComentarios(params['id']).subscribe((res: Comentario[]) => {
        this.comentarios.push(...res);
      });

      redSocial.getLikes(params['id']).subscribe((res: any[]) => {
        this.Liked = res.length !== 0;
      });

      this.loading = false;
  });
}

  ngOnInit() {
    setTimeout(() => {
      this.getUsuario();
      this.IdUserSesion = localStorage.getItem('UserId');
    }, 1000);
  }

  publicar() {
    this.redSocial.postComentarios(this.comentario).subscribe((res: Comentario) => {
      this.comentarios.unshift(res);

      this.comentario.comentario = '';
    });
 }

 likes(idImagen: string) {
    this.redSocial.Likes(idImagen).subscribe((res: Fotos) => {
      this.foto = res;
      this.Liked = !this.Liked;
    });
 }

 getUsuario() {
  this.redSocial.getUser(this.idUser).subscribe((res: User) => {
    this.user = res;
    console.log(res);
  });
 }

 deleteComment(id: string) {
   if (confirm('seguro de que quieres borrar este comentario')) {
     this.redSocial.deleteComentario(id).subscribe(res => {
      this.comentarios = this.comentarios.filter(c => c._id !== res._id);
     });

   }
 }

 preEditComment(id: string) {
  this.redSocial.getComengario(id).subscribe((res: Comentario) => {
    this.comentarioParaEditar = res;
  });
 }

 EditComment() {
  this.redSocial.updateCommentario(this.comentarioParaEditar._id, this.comentarioParaEditar).subscribe((res: Comentario) => {
    /* this.comentarios = this.comentarios.filter(c => c._id !== res._id);
    this.comentarios.unshift(res);
    console.log(res);*/

    this.redSocial.getComentarios(res.imagen_id).subscribe((ress: Comentario[]) => {
      console.log(ress);
      this.comentarios = ress;
    });
  });
 }

}
