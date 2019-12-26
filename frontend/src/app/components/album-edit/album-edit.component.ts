import { Component, OnInit } from '@angular/core';
import { RedSocialService } from 'src/app/services/red-social.service';
import { Album } from 'src/app/interfaces/interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styles: []
})
export class AlbumEditComponent implements OnInit {

  album: Album = {
    _id: '',
    nombre: '',
    description: '',
    user_id: ''
  };

  id: string;

  constructor(private redSocial: RedSocialService, private activatedRouter: ActivatedRoute, private router: Router) {
    activatedRouter.params.subscribe((params) => {
      this.id = params['id'];
      redSocial.getAlbum(params['id']).subscribe((res: Album) => {
        console.log(res);
        this.album = res;
      });
    });
   }

  ngOnInit() {
  }

  updateAlbum() {
    this.redSocial.updateAlbum(this.id, this.album).subscribe(res => {
      this.router.navigate(['/albumes']);
    });
  }

}
