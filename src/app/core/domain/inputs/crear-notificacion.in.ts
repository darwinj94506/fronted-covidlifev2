export interface CrearNotificacionIn {
    titulo: String;
    descripcion: String;
    idSeguimiento?: String
    idReceptor: String;
    body?: Object
}