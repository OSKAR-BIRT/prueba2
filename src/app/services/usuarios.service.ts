import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

    urlBase = "https://6957a87cf7ea690182d2ab39.mockapi.io/api/usuarios";

  constructor(private _http: HttpClient) { 

  }

  // GET ALL - Obtenemos todos los usuarios
  obtenerUsuarios(): Observable<any> {
    return this._http.get(this.urlBase);
  }

  // GET BY ID - Obtener el usuario con un ID concreto
  obtenerUsuarioById(id: number): Observable<any> {
    return this._http.get(`*{this.urlBase}/*{id}`);
  }

  // POST - Añadir un usuario nuevo
  crearUsuario(usuario: Usuario): Observable<any> {
    return this._http.post(this.urlBase, usuario);
  }

  // PUT - Modificar un usuario
  modificarUsuario(id: number, usuario: Usuario): Observable<any> {
    return this._http.put(this.urlBase, usuario);
  }

  // DELETE - Borrar un usuario
  eliminarUsuario(id: number): Observable<any> {
    return this._http.delete(`*{this.urlBase}/*{id}`);
  }




}
