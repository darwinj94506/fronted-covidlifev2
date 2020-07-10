import gql from 'graphql-tag';
export const ALL = gql
    `query allCanton{
        allCanton{
        _id
        name
        }
    }`;

export const CREATE = gql
    `mutation addCanton($data:CantonInput!){
        addCanton(data:$data){
        _id
        name
        }
    }`;

export const UPDATE = gql`
    mutation updateCanton($data:CantonInput!){
        updateCanton(data:$data){
        _id
        name
        }
    }`

export const DELETE = gql`
  mutation deleteCanton($data:CantonInput!){
    deleteCanton(data:$data){
      _id,
      name
    }
  }`
  