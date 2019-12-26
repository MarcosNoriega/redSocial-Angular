import { Component, OnInit } from '@angular/core';
import { Fotos, Album } from '../../interfaces/interface';
import { RedSocialService } from 'src/app/services/red-social.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: []
})
export class FotosComponent implements OnInit {

  fot: Fotos = {
    _id: '',
    nombre: '',
    descripcion: '',
    albumId: '',
    userId: '',
    ruta: '',
    imagen: null,
    likes: 0,
    publico: false,
    views: 0
  };

  fotos: Fotos[] = [];

  albumes: Album[] = [];

  fotoSelecionada: ArrayBuffer | String;

  loading = true;

  constructor(private redSocial: RedSocialService, private router: Router, private activatedRoute: ActivatedRoute) {
    redSocial.getAlbumes().subscribe((res: Album[]) => {
      this.albumes.push(...res);
      console.log(this.albumes);
    });

    redSocial.getAllImagenes().subscribe((res: Fotos[]) => {
      this.fotos.push(...res);
      console.log(this.fotos);
      this.loading = false;
    });
  }

  ngOnInit() {
  }

  onChange(event) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      this.fot.imagen = event.target.files[0];

      // image preview
      const reader = new FileReader();
      reader.onload = e => this.fotoSelecionada = reader.result;
      reader.readAsDataURL(this.fot.imagen);
    }
  }

  subirFoto(albumId: string) {
    this.fot.albumId = albumId;
    this.redSocial.subirFoto(this.fot).subscribe((res: Fotos) => {
      console.log(res);
      this.fotos.push(res);
      this.limpiarForm();
    });
  }

  limpiarForm() {
    this.fot = {
      _id: '',
      nombre: '',
      descripcion: '',
      albumId: '',
      userId: '',
      ruta: '',
      imagen: null,
      likes: 0,
      publico: false,
      views: 0
    };
  }

  deleteFoto(id: string) {
    if (confirm('Estas seguro de que quieres borrar')) {
      return this.redSocial.deleteFoto(id).subscribe(res => {
        this.fotos = this.fotos.filter(foto => foto._id !== res._id);
      });

    }
  }

  verFoto(id: string) {
    this.router.navigate(['foto', id]);
  }

  editFoto(id: string) {
    this.router.navigate(['foto', 'edit', id]);
  }

}
