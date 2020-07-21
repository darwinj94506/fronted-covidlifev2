import gql from 'graphql-tag';

export const ALL = gql`
    
`;

export const CREATE = gql`
    mutation addEspacio($data: EspacioIn!){
        addEspacio(data:$data){
        nombre
        }
    }
`;
  
export const UPDATE = gql`
  
`;

export const DELETE = gql`
   
`;

  