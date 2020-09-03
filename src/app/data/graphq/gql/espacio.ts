import gql from 'graphql-tag';

export const ALL =  `
    
`;

export const CREATE = gql`
    mutation addEspacio($data: EspacioIn!){
        addEspacio(data:$data){
        _id
        nombre
        tipo
        }
    }
`;
  
export const UPDATE = `
  
`;

export const DELETE = `
   
`;

export const GET_BY_TYPE_ID_PADRE = gql `
  query listfilterEspacio($dataFilter:FilterEspacioIn!){
    listfilterEspacio(dataFilter:$dataFilter){
      _id
      nombre
      tipo
    }
  }
`;

export const VER_DETALLE = gql `
  query verEspacio($data: VerEspacioIn!){
    verDetalleEspacio(data:$data){
      _id
      nombre
      descripcion
      tipo
      idEspacio
      latitud
      longitud
      estado_entidad
    }
  }
  
` ;