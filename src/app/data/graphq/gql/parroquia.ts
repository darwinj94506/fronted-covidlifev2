import gql from 'graphql-tag';
export const ALL = gql
    `query allParroquia{
        allParroquia{
          _id
          name
        }
    }`;

export const CREATE = gql
    `mutation addParroquia($data:ParroquiaInput!){
        addParroquia(data:$data){
          _id
          name
        }
    }`;

export const UPDATE = gql`
    mutation updateParroquia($data:ParroquiaInput!){
        updateParroquia(data:$data){
        _id
        name
        }
    }`;

export const DELETE = gql`
mutation deleteParroquia($data:ParroquiaInput!){
    deleteParroquia(data:$data){
      _id
      name
    }
  }`;
  