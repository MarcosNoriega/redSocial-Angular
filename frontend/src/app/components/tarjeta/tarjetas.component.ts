import { Component, OnInit, Input } from '@angular/core';
import { Fotos } from 'src/app/interfaces/interface';
import { RedSocialService } from 'src/app/services/red-social.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styles: []
})
export class TarjetasComponent implements OnInit {

  @Input() fotos: Fotos[];

  constructor(private redSocial: RedSocialService, private router: Router) { }

  ngOnInit() {
  }

  deleteFoto(id: string) {
    if (confirm('Estas seguro de que quieres borrar')) {
      return this.redSocial.deleteFoto(id).subscribe(res => {
        this.fotos = this.fotos.filter(foto => foto._id !== res._id);
      });

    }
  }

  verFoto(id: string) {
    this.router.navigate(['foto', id]);
  }

  editFoto(id: string) {
    this.router.navigate(['foto', 'edit', id]);
  }

}
