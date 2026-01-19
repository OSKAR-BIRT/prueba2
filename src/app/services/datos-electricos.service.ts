import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosElectricosService {

  urlBase: string = "https://apidatos.ree.es/es/datos/generacion/estructura-generacion?geo_ids=10&start_date=2025-12-01T00:00&end_date=2025-12-31T23:59&time_trunc=day&geo_limit=peninsular&geo_ids=8741";

  constructor(private _http: HttpClient) { 

  }

  // GET
  obtenerDatos (): Observable<any> {
    return this._http.get(this.urlBase);
  }
}
