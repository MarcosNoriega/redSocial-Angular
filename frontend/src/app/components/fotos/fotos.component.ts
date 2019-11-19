import { Component, OnInit } from '@angular/core';
import { Fotos, Album } from '../../interfaces/interface';
import { RedSocialService } from 'src/app/services/red-social.service';

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
    AlbumId: '',
    userId: '',
    ruta: '',
    imagen: null
  };

  fotos: Fotos[] = [];

  albumes: Album[] = [];

  fotoSelecionada: ArrayBuffer | String;

  constructor(private redSocial: RedSocialService) {
    redSocial.getAlbumes().subscribe((res: Album[]) => {
      this.albumes.push(...res);
      console.log(this.albumes);
    });

    redSocial.getAllImagenes().subscribe((res: Fotos[]) => {
      this.fotos.push(...res);
      console.log(this.fotos);
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

  subirFoto() {
    this.redSocial.subirFoto(this.fot).subscribe((res: Fotos) => {
      this.fotos.push(res);
      this.limpiarForm();
    });
  }

  limpiarForm() {
    this.fot = {
      _id: '',
      nombre: '',
      descripcion: '',
      AlbumId: '',
      userId: '',
      ruta: '',
      imagen: null
    };
  }

  deleteFoto(id: string) {
    if (confirm('Estas seguro de que quieres borrar')) {
      return this.redSocial.deleteFoto(id).subscribe(res => {
        this.fotos = this.fotos.filter(foto => foto._id !== res._id);
      });

    }
  }

}
