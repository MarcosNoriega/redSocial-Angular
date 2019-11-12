import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RedSocialService } from 'src/app/services/red-social.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styles: []
})
export class ContenidoComponent implements OnInit {

  constructor(private router: Router, private redSocial: RedSocialService) {
    if (!redSocial.auth) {
      router.navigate(['login']);
    }
  }

  ngOnInit() {
  }

}
