import { Component, OnInit } from '@angular/core';
import { Fotos } from 'src/app/interfaces/interface';
import { RedSocialService } from 'src/app/services/red-social.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-favoritas',
  templateUrl: './favoritas.component.html',
  styles: []
})
export class FavoritasComponent implements OnInit {

  fotos: Fotos[] = [];
  loading = true;

  constructor(private redSocial: RedSocialService, private router: Router) {
    this.redSocial.getImagenesLikes().subscribe((res: Fotos[]) => {
      console.log(res);
      this.fotos.push(...res);
      this.loading = false;
    });
   }

  ngOnInit() {
  }

  verFoto(id: string) {
    this.router.navigate(['foto', id]);
  }

}
