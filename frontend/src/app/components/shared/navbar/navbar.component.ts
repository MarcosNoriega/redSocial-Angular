import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, DoCheck {

  nombre: string;
  apellido: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
  }

  ngDoCheck() {
    this.nombre = localStorage.getItem('Nombre');
    this.apellido = localStorage.getItem('Apellido');
  }

  search(termino: string) {
    this.router.navigate(['search', termino]);
  }
}
