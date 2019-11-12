import { Component, OnInit } from '@angular/core';
import { RedSocialService } from 'src/app/services/red-social.service';
import { Album } from '../../interfaces/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.component.html',
  styles: []
})
export class AlbumesComponent implements OnInit {

  albumes: Album[] = [];
  album: Album = {
    _id: '',
    nombre: '',
    description: '',
    user_id: ''
  };

  constructor(private redSocial: RedSocialService, private router: Router) {
    redSocial.getAlbumes().subscribe((res: Album[]) => {
      this.albumes.push(...res);
    });
   }

  ngOnInit() {
  }

  enviarAlbum() {
    this.redSocial.postAlbumes(this.album).subscribe((res: Album) => {
      this.albumes.push(res);
    });
    this.clearForm();
  }

  deleteAlbum(id: string) {
    if (confirm('Esta seguro de eliminar')) {
      this.redSocial.deleteAlbum(id).subscribe((res: Album) => {
        console.log(res);
        this.albumes = this.albumes.filter(album => album._id !== res._id);
      });

    }
  }

  verAlbum(id: string) {
    this.router.navigate(['album', id]);
  }

  clearForm() {
    this.album = {
      _id: '',
      nombre: '',
      description: '',
      user_id: ''
    };
  }

}
