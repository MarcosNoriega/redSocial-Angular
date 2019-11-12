import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interface';
import { RedSocialService } from 'src/app/services/red-social.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  user: User = {
    name: '',
    surname: '',
    mail: '',
    password: ''
  };

  constructor(private redSocial: RedSocialService, private router: Router) { }

  ngOnInit() {
  }

  registrarUser() {
    this.redSocial.registrarUser(this.user).subscribe(res => {
      localStorage.setItem('token', res['token']);
      this.redSocial.actualizarAuth(res['auth']);
      this.router.navigate(['contenido']);
    });
  }

}
