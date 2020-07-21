import gql from 'graphql-tag';

export const LOGIN = gql `
mutation loginUser($data: LoginIn!){
  loginUser(data:$data){
    name
    lastname
    direccion
    email
    telefono
    fechaNacimiento
    genero
    direccion
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
      fechaNacimiento
      genero
      direccion
    }
  }
`;
