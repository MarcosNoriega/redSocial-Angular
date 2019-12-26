import { Component, OnInit } from '@angular/core';
import { RedSocialService } from 'src/app/services/red-social.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-panel-segidores',
  templateUrl: './panel-segidores.component.html',
  styles: []
})
export class PanelSegidoresComponent implements OnInit {

  usersSeguidores: User[] = [];
  usersSiguiendo: User[] = [];

  idUserAuth: string;

  constructor(private redSocial: RedSocialService, private activatedRouter: ActivatedRoute) { 
    redSocial.getSeguidores().subscribe((res: User[]) => {
      console.log(res);
      this.usersSeguidores.push(...res);
    });

    redSocial.getSiguiendo().subscribe((res: User[]) => {
      console.log(res);
      this.usersSiguiendo.push(...res);
    });
  }

  ngOnInit() {
    this.idUserAuth = localStorage.getItem('UserId');
  }

  noSeguir(idSiguiendo: string) {
    this.redSocial.dejarDeSeguir(idSiguiendo).subscribe(res => {
      console.log(res);
    });

    this.redSocial.deleteSeguidor(idSiguiendo).subscribe(res => {
      console.log(res);
    });

    this.usersSiguiendo = this.usersSeguidores.filter(x => x._id !== idSiguiendo);
  }

}
