import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interface';
import { RedSocialService } from 'src/app/services/red-social.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  user: User = {
    name: '',
    surname: '',
    mail: '',
    password: ''
  };

  constructor(private redSocial: RedSocialService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.redSocial.loginUser(this.user).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res['token']);
      localStorage.setItem('Nombre', res['user'].name);
      localStorage.setItem('Apellido', res['user'].surname);
      this.redSocial.actualizarAuth(res['auth']);
      this.router.navigate(['contenido']);
    });
  }

}
