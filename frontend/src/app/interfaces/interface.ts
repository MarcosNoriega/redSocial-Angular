export interface Imagen {
    userId: string;
    public_id: string;
    nombre: string;
    descripcion: string;
    ruta: string;
}

export interface User {
    name: string;
    surname: string;
    mail: string;
    password: string;
}

export interface Album {
    _id: string;
    nombre: string;
    description: string;
    user_id: string;
}

export interface Fotos {
    _id: string;
    nombre: string;
    descripcion: string;
    AlbumId: string;
    userId: string;
    ruta: string;
    imagen: File;
}
