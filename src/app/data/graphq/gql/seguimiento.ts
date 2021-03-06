import gql from 'graphql-tag';

export const CREATE = gql`
    mutation addSolicitudSeguimiento($data:SolicitarSeguimientoIn!){
        addSolicitudSeguimiento(data:$data){
        _id
        }
    }
`;
  
export const UPDATE = gql`
  mutation editSeguimiento($data:EditarSeguimientoIn!){
    editSeguimiento(data:$data){
      _id
    }
  }
`;

export const DELETE = `
    
`;

export const FILTER = gql`
query filterSeguimiento($data:FiltrarSeguimientoIn!){
  filterSeguimiento(data:$data){
    _id
    idPaciente{
      _id
      name
      lastname
      ci
      email
      state
      token_notificacion_web
      token_notificacion_movil
    }
    idDoctor{
      _id
      name
      lastname
      ci
      email
      state
    }
    idHospital{
      _id
      nombre
      descripcion
      idEspacio
      estado_entidad
    }
    estado
    temperatura
    ritmo_cardiaco
    saturacion_oxigeno
    dificultad_respirar
    examen
    nota_paciente
    observacion_doctor
    estado_diario_paciente
    fecha_atencion_medica
    diagnostico_actual
    aislamiento_desde
    aislamiento_hasta
    latitud
    longitud
    createAt
  }
}
`;
  
export const GET_BY_ID = gql`
query consultarUnSeguimiento($data:ConsultarUnSeguimientoIn!){
  consultarUnSeguimiento(data:$data){
    _id
    idPaciente{
      _id
      name
      lastname
      ci
      email
      state
    }
    idDoctor{
      _id
      name
      lastname
      ci
      email
      state
    }
    idHospital{
      _id
      nombre
      descripcion
      idEspacio
      estado_entidad
    }
    estado
    temperatura
    ritmo_cardiaco
    saturacion_oxigeno
    dificultad_respirar
    examen
    nota_paciente
    observacion_doctor
    estado_diario_paciente
    fecha_atencion_medica
    diagnostico_actual
    aislamiento_desde
    aislamiento_hasta
    latitud
    longitud
    createAt
  }
}
`;

export const SUSCRIPTION = gql`
  subscription {
    cambioSeguimientoNotificacion{
      _id
      idDoctor{
        _id
        name
        lastname
        ci
        email
        state
      }
      idPaciente{
        _id
        name
        lastname
        ci
        email
        state
        token_notificacion_web
        token_notificacion_movil
      }
      idHospital{
        _id
        nombre
        descripcion
        idEspacio
        estado_entidad
      }
      estado
      temperatura
      ritmo_cardiaco
      saturacion_oxigeno
      dificultad_respirar
      examen
      nota_paciente
      observacion_doctor
      estado_diario_paciente
      fecha_atencion_medica
      diagnostico_actual
      aislamiento_desde
      aislamiento_hasta
      latitud
      longitud
      createAt
    }
  }`;

export const ATENDER_SEGUIMIENTO = gql `
  mutation atenderSolicitudSeguimiento($data:AtenderSolicitudSeguimientoIn!){
    atenderSolicitudSeguimiento(data:$data){
      _id
    }
  }`;

export const AGENDAR_SEGUIMIENTO = gql`
  mutation agendarSolicitudSeguimiento($data: AgendarSolicitudSeguimientoIn!){
    agendarSolicitudSeguimiento(data:$data){
      _id
    }
  }
`;
 
export const RESUMEN_SEGUIMIENTOS_COMPLETOS = gql`
  query getSeguimientoCompletoPaciente($data: SeguimientoCompletoPacienteIn!){
    getSeguimientoCompletoPaciente(data:$data){
      _id
      seguimientos{
        _id
        idPaciente{
        name
        lastname
      }
      idDoctor{
        name
        lastname
      }
      idHospital{
        _id
        nombre
        descripcion
        idEspacio
        estado_entidad
      }
      estado
      temperatura
      ritmo_cardiaco
      saturacion_oxigeno
      dificultad_respirar
      examen
      nota_paciente
      observacion_doctor
      estado_diario_paciente
      fecha_atencion_medica
      diagnostico_actual
      aislamiento_desde
      aislamiento_hasta
      latitud
      longitud
      createAt
      }   
    }
  }`;


export const CREATE_NOTIFICATION = gql`
  mutation addNotificacion($data:CrearNotificacionIn!){
    addNotificacion(data:$data){
      _id
      titulo
      descripcion
      idSeguimiento
      idEmisor
      idReceptor
      vistaEn
      estadoNotificacion
      fechaCambioUltimoEstado
      createAt
    }
  }
`;

export const VER_NOTIFICACIONES_ENVIADAS = gql `
  query getNotificacionesEnviadas($data:ObtenerNotificacionesEnviadasIn!){
    getNotificacionesEnviadas(data:$data){
      _id
      titulo
      descripcion
      idSeguimiento
      idEmisor{
        _id
        name
        lastname
        ci
        email
        state
      }
      idReceptor{
        _id
        name
        lastname
        ci
        email
        state
      }
      body
      vistaEn
      estadoNotificacion
      fechaCambioUltimoEstado
      createAt
    }
    
  }
`;

export const GET_NOTIFICAIONES_RECIBIDAS = gql ` 
query getNotificacionesrecibidas($data:ObtenerNotificacionesRecibidasIn!){
  getNotificacionesRecibidas(data:$data){
    _id
    titulo
    descripcion
    idSeguimiento
    idEmisor{
      _id
      name
      lastname
      ci
      email
      state
    }
    idReceptor{
        _id
      name
      lastname
      ci
      email
      state
    }
    body
    vistaEn
    estadoNotificacion
    fechaCambioUltimoEstado
    createAt
  }  
}
`;

export const SUSCRIPTIONS_NOTIFICATIONS = gql `
  subscription cambioNotificacionNotif{
    cambioNotificacionNotif{
      _id
      titulo
      descripcion
      idSeguimiento
      idEmisor{
        _id
        name
        lastname
        ci
        email
        state
      }
      idReceptor{
        _id
        name
        lastname
        ci
        email
        state
      }
      body
      vistaEn
      estadoNotificacion
      fechaCambioUltimoEstado
      createAt
    }
  }`;

  
  