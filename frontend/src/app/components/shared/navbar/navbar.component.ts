import { Component, OnInit } from '@angular/core';
import { RedSocialService } from 'src/app/services/red-social.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  nombre: string;
  apellido: string;

  constructor(private redSocial: RedSocialService) {
    this.nombre = localStorage.getItem('Nombre');
    this.apellido = localStorage.getItem('Apellido');

  }

  ngOnInit() {
  }

}
