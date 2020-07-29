import gql from 'graphql-tag';

export const LOGIN = gql `
mutation loginUser($data: LoginIn!){
  loginUser(data:$data){
    _id
    name
    lastname
    ci
    email
    isRoot
    roles{
      idHospital{
        _id
        nombre
        descripcion
      }
      roles
    }
  }
}
`;

export const REGISTER = gql`
  mutation signUser($data: SignupIn!){
    signUser(data:$data){
      name
      lastname
      direccion
      email
      telefono
      genero
      direccion
    }
  }
`;

export const LOGOUT = gql`
  query logout{
    logout
  }
`;

export const FILTER_USERS = gql`
  query listAllUsers($data:FilterUserIn!){
    listAllUser(dataFilter:$data){
      _id
      name
      lastname
      ci
      telefono
    }
  }
`;

export const PERFIL = gql`
query verUserPerfil($data:IdIn!){
  verUserPerfil(userId:$data){
    _id
    name
    lastname
    ci
    email
    state
    roles{
      idHospital{
        _id
        nombre
        descripcion
        idEspacio
      }
    }
    telefono
    isRoot
    ultimoAcceso
    motivo_alta_sistema{
      fecha
      idUserDaMotivoAlta
      motivo
    }
    fechaNacimiento
    genero
    latitud
    longitud
    direccion
    datos_paciente{
      aislado_por
      alergia_medicamentos
      tiene_diagnosticado_enfermedad
      es_diagnosticado_cancer
      es_embarazada
      esta_dando_lactar
      fue_es_fumador
      tiene_carnet_discapacidad
      tiene_diabetes
      tiene_presion_alta
      familiares_cerco
    }
  }
}

`;