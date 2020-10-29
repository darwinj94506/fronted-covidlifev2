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
}`;

export const PACIENTES_SIN_SEGUIMENTOS = gql`
  query mostrarUsuarioSinSeguimiento($data:UsuarioSinSeguimientoPorDiaIn!){
    mostrarUsuarioSinSeguimientoPorHoyHospital(data:$data){
      name
      lastname
    }
  } `;
