import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RedSocialService } from 'src/app/services/red-social.service';
import { Album } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styles: []
})
export class AlbumComponent implements OnInit {

  constructor(private redSocial: RedSocialService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      redSocial.getAlbum(params['id']).subscribe((res: Album) => {
        console.log(res);
      });

      redSocial.getImagenes(params['id']).subscribe((res) => {
        console.log(res);
      });
    });
   }

  ngOnInit() {
  }

}
