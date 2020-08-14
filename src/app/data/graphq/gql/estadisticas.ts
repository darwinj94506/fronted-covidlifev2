import gql from 'graphql-tag';

export const COUNT_PACIENTES = gql`
query contadoresEstadisticos($data: ContadoresEstadisticaIn!){
    contadoresEstadisticos(data:$data){
      countPacientesPorDiagnostico{
        _id{
          diagnostico_enum
        }
        contador
      }
      countPacientesPorDiaPorDiagnosticoOut{
        _id{
          fecha_creacion
          diagnostico_enum
        }
        contador
      }
      countUserPorRoleAndHospital
    }
  }
  
`;

  