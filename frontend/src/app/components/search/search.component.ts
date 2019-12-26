import { Component, OnInit } from '@angular/core';
import { RedSocialService } from 'src/app/services/red-social.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Fotos } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  termino: string;

  users: User[] = [];
  fotos: Fotos[] = [];

  constructor(private redSocial: RedSocialService, private activatedRouter: ActivatedRoute, private router: Router) {
    activatedRouter.params.subscribe(params => {
      this.termino = params['termino'];
      redSocial.searchUser(params['termino']).subscribe((res: User[]) => {
        this.users = [];
        this.users.push(...res);
      });

      redSocial.searchImages(params['termino']).subscribe((res: Fotos[]) => {
        this.fotos = [];
        this.fotos.push(...res);
      });
    });
   }

  ngOnInit() {
  }

  visitarPerfil(id: string) {
    this.router.navigate(['perfil', id]);
  }

}
