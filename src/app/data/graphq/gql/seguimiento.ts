import gql from 'graphql-tag';

export const CREATE = gql`
    mutation addSolicitudSeguimiento($data:SolicitarSeguimientoIn!){
        addSolicitudSeguimiento(data:$data){
        _id
        }
    }
`;
  
export const UPDATE = `

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
    latitud
    longitud
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
    latitud
    longitud
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
    latitud
    longitud
  }
}`;

export const ATENDER_SEGUIMIENTO = gql `
  mutation atenderSolicitudSeguimiento($data:AtenderSolicitudSeguimientoIn!){
    atenderSolicitudSeguimiento(data:$data){
      _id
    }
  }
`;

export const AGENDAR_SEGUIMIENTO = gql`
  mutation agendarSolicitudSeguimiento($data: AgendarSolicitudSeguimientoIn!){
    agendarSolicitudSeguimiento(data:$data){
      _id
    }
  }
`;