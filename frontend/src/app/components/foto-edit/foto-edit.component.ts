import { Component, OnInit } from '@angular/core';
import { RedSocialService } from 'src/app/services/red-social.service';
import { Album, Fotos } from 'src/app/interfaces/interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-foto-edit',
  templateUrl: './foto-edit.component.html',
  styles: []
})
export class FotoEditComponent implements OnInit {

  albumes: Album[] = [];
  foto: Fotos = {
    _id: '',
    nombre: '',
    descripcion: '',
    albumId: '',
    userId: '',
    ruta: '',
    imagen: null,
    likes: 0,
    publico: false,
    views: 0,
  };
  id: string;

  constructor(private redSocial: RedSocialService, private activatedRouter: ActivatedRoute, private router: Router) {
    activatedRouter.params.subscribe(params => {
      this.id = params['id'];
     redSocial.getImagen(this.id).subscribe((res: Fotos) => {
      this.foto = res;
     });
    });

    redSocial.getAlbumes().subscribe((res: Album[]) => {
      this.albumes.push(...res);
    });
   }

  ngOnInit() {
  }

  actualizarFoto() {
    this.redSocial.updateFoto(this.id, this.foto).subscribe(res => {
      console.log(res);
      this.router.navigate(['/fotos']);
    });

  }

}
