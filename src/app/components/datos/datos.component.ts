import { Component, OnInit } from '@angular/core';
import { RegistroIndividual, DatosElectricos } from '../../models/datos-electricos';
import { DatosElectricosService } from '../../services/datos-electricos.service';

@Component({
  selector: 'app-datos',
  standalone: false,
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent implements OnInit{

  datosDescargados: any = [];
  datosElectricos!: DatosElectricos;

  constructor(private _datosElectricos: DatosElectricosService) {

  }

  ngOnInit(): void {
    this.leerDatosElectricos();
  }

  leerDatosElectricos() {
    this.datosDescargados = this._datosElectricos.obtenerDatos().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }



}
