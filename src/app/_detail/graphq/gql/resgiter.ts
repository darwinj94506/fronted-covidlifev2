import gql from 'graphql-tag';

export const REGISTER = gql`
mutation register($data:UserRegisterInput!){
    registerUser(data:$data){
      _id
      name
      lastname
      email
    }
}`;
