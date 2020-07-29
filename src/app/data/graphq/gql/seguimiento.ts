import gql from 'graphql-tag';

export const CREATE = gql`
    mutation addSolicitudSeguimiento($data:SolicitarSeguimientoIn!){
        addSolicitudSeguimiento(data:$data){
        _id
        }
    }
`;
  
export const UPDATE = `

`;

export const DELETE = `
    
`;

  