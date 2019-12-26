import { Component, OnInit } from '@angular/core';
import { RedSocialService } from 'src/app/services/red-social.service';
import { ActivatedRoute } from '@angular/router';
import { Fotos } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-fotos-user',
  templateUrl: './fotos-user.component.html',
  styles: []
})
export class FotosUserComponent implements OnInit {

  fotos: Fotos[] = [];

  constructor(private redSocial: RedSocialService, private activatedRouter: ActivatedRoute) {
    activatedRouter.params.subscribe(params => {
      redSocial.getImagenesUser(params['idUser']).subscribe((res: Fotos[]) => {
        this.fotos.push(...res);
      });
    });
   }

  ngOnInit() {
  }



}
