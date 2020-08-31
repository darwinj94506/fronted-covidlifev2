import gql from 'graphql-tag';

export const COUNT_PACIENTES = gql`
query contadoresEstadisticos($data: ContadoresEstadisticaIn!){
  contadoresEstadisticos(data:$data){
    countPacientesPorDiagnostico{
      agrupadoPor{
        diagnostico_enum
      }
      contador
    }
    countPacientesPorDiaPorDiagnosticoOut{
      agrupadoPor{
        fecha_creacion
        diagnostico_enum
      }
      contador
    }
    countUserPorRoleAndHospital
  }
}`;


export const ESTADISTICAS_MAPAS = gql`
  query mapasEstadisticos($data:MapasDatosIn!){
    mapasEstadisticos(data:$data){
      mapaUserPorRoleAndHospital{
        latitud
        longitud
      },
      mapaPacientesPorDiagnostico{
        contador{
          last{
            latitud
            longitud
          }
        }
      },
      mapaUserPorRoleAndHospital{
        latitud
        longitud
      }
    }
  }
`;


  