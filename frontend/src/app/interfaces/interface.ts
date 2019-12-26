export interface Imagen {
    userId: string;
    public_id: string;
    nombre: string;
    descripcion: string;
    ruta: string;
}

export interface User {
    _id: string;
    name: string;
    surname: string;
    mail: string;
    password: string;
    seguidores: number;
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
    albumId: string;
    userId: string;
    ruta: string;
    imagen: File;
    likes: number;
    publico: boolean;
    views: number;
}

export interface Comentario {
    _id: string;
    comentario: string;
    user_id: string;
    imagen_id: string;
    gravatar: string;
}
