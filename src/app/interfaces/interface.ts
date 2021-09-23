export interface Banco {
        codigo: string;
        nombre: string;
}

export interface Pago {
        cedula: string;
        celular: string;
        codBco: string;
        monto: string;
}

export interface Favorito {
                nombre: string;
                cedula: string;
                codBco: string;
                banco: string;
                celular: string;
}


