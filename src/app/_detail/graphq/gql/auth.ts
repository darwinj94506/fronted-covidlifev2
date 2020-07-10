import gql from 'graphql-tag';

export const LOGIN = gql `
mutation loginUser($data:UserLoginInput!){
    loginUser(data:$data){
      _id
      name
      lastname
      email
    }
  }`;

export const REGISTER = gql`
mutation registerUser($data:UserRegisterInput!){
    registerUser(data:$data){
      _id
      name
      lastname
      email
    }
}`;
