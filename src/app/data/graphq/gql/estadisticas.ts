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
     agrupadoPor{
      diagnostico_enum
    },
      contador{
        latitud
        longitud
      }
    },
    mapaUserPorRoleAndHospital{
      latitud
      longitud
    }
  }
}

`;


// const i = {tipo:"COUNT_PACIENTES_POR_DIAGNOSTICO",
// idHospital:"5f501affc285b2001e58f1e6",
// idEspacioPadre:"5f123cbd05b4fe3eed94f729"}