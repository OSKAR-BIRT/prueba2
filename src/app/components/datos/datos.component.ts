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

  constructor(private _datosElectricos: DatosElectricosService) {

  }

  ngOnInit(): void {
    this.leerDatosElectricos();
  }

  leerDatosElectricos() {
    this.cargando = true;
    this._datosElectricos.obtenerDatos().subscribe({
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

  sinDecimales (numero: number): string {
    return Math.trunc(numero).toString();
  }

}
