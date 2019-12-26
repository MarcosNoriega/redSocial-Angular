import { Injectable } from '@angular/core';
import { User } from '../interfaces/interface';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.apiUrl;
  header = new HttpHeaders({
    'X-Auth-Token': localStorage.getItem('token')
  });

  constructor(private http: HttpClient, private router: Router) { }

  loggedin() {
    return !!localStorage.getItem('token');
  }

  loginUser(user: User) {
    return this.http.post(this.url + 'auth', user);
  }

  registrarUser(user: User) {
    return this.http.post(this.url + 'register', {name: user.name, surname: user.surname, mail: user.mail, password: user.password});
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('Apellido');
    localStorage.removeItem('Nombre');
    localStorage.removeItem('UserId');

    this.router.navigate(['/login']);
    location.reload();
  }

  updatePassword(password: any) {
    return this.http.post(this.url + 'user/changePassword', password, {headers: this.header});
  }

  updateUser(id: string, user: User) {
    return this.http.post(this.url + `user/update/${id}`,
    {name: user.name, surname: user.surname, mail: user.mail, password: user.password}, 
    {headers: this.header});
  }

}
