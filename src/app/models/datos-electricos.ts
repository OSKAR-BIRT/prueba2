export interface RegistroIndividual {
    fecha: Date,
    valor: number
}

export interface DetalleTecnologia {
    titulo: string;
    renovable: boolean;
    valores: RegistroIndividual[]
}

export interface DatosElectricos {
    titulo: string,
    tecnologias: DetalleTecnologia[]
}


