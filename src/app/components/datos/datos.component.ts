import { Component, OnInit } from '@angular/core';
import { RegistroIndividual, DetalleTecnologia, DatosElectricos } from '../../models/datos-electricos';
import { DatosElectricosService } from '../../services/datos-electricos.service';

@Component({
  selector: 'app-datos',
  standalone: false,
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent implements OnInit {

  datosDescargados: any = [];
  datosProcesados: DatosElectricos = { titulo: '', tecnologias: [] };
  cargando: boolean = true;
  year:number = 0;
  categoria: string = '';
  url = "https://apidatos.ree.es/es/datos/generacion/estructura-generacion?geo_ids=10&start_date=2025-01-01T00:00&end_date=2025-12-31T23:59&time_trunc=month&geo_limit=peninsular&geo_ids=8741"

  constructor(private _datosElectricos: DatosElectricosService) {

  }

  ngOnInit(): void {
    // this.leerDatosElectricos(this.url);
  }

  leerDatosElectricos(urlEnviada: string) {
    this.datosProcesados = { titulo: '', tecnologias: [] };
    this.cargando = true;
    this._datosElectricos.obtenerDatos(urlEnviada).subscribe({
      next: (respuestaApi) => {
        this.datosProcesados.titulo = respuestaApi.data.attributes.title;
        this.datosDescargados = respuestaApi.included;
        this.datosDescargados.forEach((element: any) => {
          let tecnologia: DetalleTecnologia = { titulo: '', renovable: false, valores: [] };
          tecnologia.titulo = element.attributes.title;
          tecnologia.renovable = element.attributes.type == 'Renovable' ? true : false;
          element.attributes.values.forEach((value: any) => {
            const registro: RegistroIndividual = {
              fecha: value.datetime,
              valor: value.value
            }
            tecnologia.valores.push(registro);
          });
          this.datosProcesados.tecnologias.push(tecnologia);
        });
        this.cargando = false;
        console.log(respuestaApi);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  extraerDia(fechaInput: Date | string): string {
    const fecha = new Date(fechaInput);
    // Usamos padStart para que el día 3 se vea como "03"
    return fecha.getDate().toString().padStart(2, '0');
  }

  extraerMes(fechaInput: Date | string): string {
    const fecha = new Date(fechaInput);
    const meses: string[] = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
    // Usamos padStart para que el día 3 se vea como "03"
    return meses[fecha.getMonth()];
  }

  sinDecimales (numero: number): string {
    return Math.trunc(numero).toString();
  }

  enviar() {
    const urlBase = 'https://apidatos.ree.es/es/datos/';
    let widget: string = '';
    
    if (this.categoria=='demanda') {
      widget = 'ire-general';
    } else {
      widget = 'estructura-generacion'
    }

    const inicio = 'start_date=' + this.year + '-01-01T00:00';
    const fin = 'end_date=' + this.year + '-12-31T23:59';
    const tiempo = 'time_trunc=month'

    const urlGenerada = urlBase + this.categoria + '/' + widget + '?' + inicio + '&' + fin + '&' + tiempo;

    this.leerDatosElectricos(urlGenerada);

  }

}
