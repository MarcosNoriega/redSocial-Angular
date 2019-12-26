import { Component, OnInit } from '@angular/core';
import { RedSocialService } from 'src/app/services/red-social.service';
import { User, Fotos } from 'src/app/interfaces/interface';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router, ChildActivationEnd } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  user: User = {
    _id: '',
    name: '',
    surname: '',
    password: '',
    mail: '',
    seguidores: 0
  };

  userModif: User = {
    _id: '',
    name: '',
    surname: '',
    password: '',
    mail: '',
    seguidores: 0
  };

  idUserAuth;
  fotosTop5Views: Fotos[] = [];
  fotosPopulares: Fotos[] = [];

  password = {
    CurrentPassword: '',
    newPassword: ''

  };

  error = false;
  success = false;
  siguiendo = false;
  loading = true;

  constructor(private redSocial: RedSocialService,
    private auth: AuthService, private activatedRouter: ActivatedRoute, private router: Router) {
    activatedRouter.params.subscribe(params => {
      if (params['id']) {
        redSocial.getUser(params['id']).subscribe((res: User) => {
          this.user = res;
          console.log(res);
        });

        redSocial.verificarSiguiendo(params['id']).subscribe((res: boolean) => {
          this.siguiendo = res;
        });
      } else {
        redSocial.getThisUser().subscribe((res: User) => {
          this.user = res;
          this.userModif = res;
          console.log(res);
         });
      }
    });

   }

  ngOnInit() {
    setTimeout(() => {
      this.getTop5Views();
      this.getPopulares();
      this.loading = false;
      this.idUserAuth = localStorage.getItem('UserId');
    }, 1000);
  }

  getTop5Views() {
    this.redSocial.getFotosTop5ViewsUser(this.user._id).subscribe((res: Fotos[]) => {
      this.fotosTop5Views.push(...res);
    });
  }

  getPopulares() {
    this.redSocial.getFotosPopularesUser(this.user._id).subscribe((res: Fotos[]) => {
      this.fotosPopulares.push(...res);
    });
  }

  updatePassword() {
    this.auth.updatePassword(this.password).subscribe(res => {
      console.log(res);
      this.password = {
        CurrentPassword: '',
        newPassword: ''
      };
      this.error = false;
      this.success = true;
    }, err => {
      if (err.error.massaje === 'password incorrect') {
        this.error = true;

        this.password = {
          CurrentPassword: '',
          newPassword: ''
        };
      }
    });
  }

  updateUser() {
    this.auth.updateUser(this.user._id, this.userModif).subscribe(res => {
      console.log(res);
    });
   }

   verFotos() {
     this.router.navigate(['fotos', this.user._id]);
   }

   seguir() {
     this.redSocial.seguir(this.user._id, this.idUserAuth).subscribe(res => {
      console.log(res);
     });

     this.redSocial.sigiendo(this.idUserAuth, this.user._id).subscribe(res => {
      console.log(res);
     });

     this.siguiendo = !this.siguiendo;
   }

   dejarDeSeguir() {
     this.redSocial.dejarDeSeguir(this.user._id).subscribe(res => {
       console.log(res);
     });

     this.redSocial.deleteSeguidor(this.user._id).subscribe(res => {
       console.log(res);
     });

     this.siguiendo = !this.siguiendo;
   }

   verImagen(id: string) {
     this.router.navigate(['/foto', id]);
   }

}
