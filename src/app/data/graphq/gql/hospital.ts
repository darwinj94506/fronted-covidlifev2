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
  
export const UPDATE = `
  
`;

export const DELETE = `
    
`;
export const LIST_FILTER = gql`
    query listfilterHospital($data:FilterHospitalIn!){
        listfilterHospital(dataFilter:$data){
        _id
        nombre
        descripcion
        }
    }
  
`;

  