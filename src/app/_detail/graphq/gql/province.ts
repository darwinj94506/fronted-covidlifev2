import gql from 'graphql-tag';

export const ALL = gql`
    query allProvinces{
        allProvincel{
        _id
        name
        cantons{
            _id
            name
            idProvincia
            parroquias{
            _id
            name
            idCanton
            }
            idParroquias
        }
        idCantons
        }
    }  
`;

export const CREATE = gql`
    mutation createProvince($data:ProvinceInput!){
        addProvince(data:$data){
        _id
        name
        }
    }
`;
  
export const UPDATE = gql`
    mutation updateProvince($data: ProvinceInput!){
        updateProvince(data:$data){
        _id
        name
    }
  }
`;

export const DELETE = gql`
    mutation deleteProvince($data:ProvinceInput!){
        deleteProvince(data:$data){
        _id
        name
    }
  }
`;

  