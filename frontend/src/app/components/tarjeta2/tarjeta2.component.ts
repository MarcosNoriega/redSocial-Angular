import { Component, OnInit, Input } from '@angular/core';
import { Fotos } from 'src/app/interfaces/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta2',
  templateUrl: './tarjeta2.component.html',
  styles: []
})
export class Tarjeta2Component implements OnInit {

  @Input() fotos: Fotos[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  mostrarFoto(id: string) {
    this.router.navigate(['foto', id]);
  }

}
