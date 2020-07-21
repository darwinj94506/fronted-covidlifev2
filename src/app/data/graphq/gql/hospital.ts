import gql from 'graphql-tag';

export const CREATE = gql`
    mutation addHospital($data:HospitalIn!){
        addHospital(data:$data){
        _id
        nombre
        descripcion
        }
    }
`;
  
export const UPDATE = gql`
  
`;

export const DELETE = gql`
    
`;

  