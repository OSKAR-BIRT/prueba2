export interface RegistroIndividual {
    fecha: Date,
    valor: number
}

export interface DatosElectricos {
    tipo: string,
    renovable: boolean,
    datos: RegistroIndividual[]
}
