import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  user: User = {
    _id: '',
    name: '',
    surname: '',
    mail: '',
    password: '',
    seguidores: 0
  };

  errorPassword = false;
  mensajeError = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.loginUser(this.user).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res['token']);
      localStorage.setItem('Nombre', res['user'].name);
      localStorage.setItem('Apellido', res['user'].surname);
      localStorage.setItem('UserId', res['user']._id);
      // this.redSocial.actualizarAuth(res['auth']);
      this.router.navigate(['contenido']);
    }, err => {
      if (err.error.massaje === 'password incorrect') {
        this.errorPassword = true;
        this.mensajeError = 'password incorrecto.';
      } else if (err.error.massaje === 'user no found') {
        this.errorPassword = true;
        this.mensajeError = 'usuario no encontrado, el main que colocó no se encuentra registrado.';
      }
    });
  }

}
