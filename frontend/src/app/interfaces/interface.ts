export interface Imagen {
    userId: String;
    public_id: String;
    nombre: String;
    descripcion: String;
    ruta: String;
}

export interface User {
    name: String;
    surname: String;
    mail: String;
    password: String;
}

export interface Album {
    _id: String;
    nombre: String;
    description: String;
    user_id: String;
}
