import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RedSocialService } from 'src/app/services/red-social.service';
import { Fotos } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styles: []
})
export class ContenidoComponent implements OnInit {

  fotos: Fotos[] = [];

  loading = true;

  constructor(private router: Router, private redSocial: RedSocialService) {
  }

  ngOnInit() {
    this.redSocial.getContenido().subscribe((res: Fotos[]) => {
      this.fotos.push(...res);
      this.loading = false;
    }, err => {
      console.log(err);
    });
  }



}
