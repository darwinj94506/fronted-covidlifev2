import { DiagnosticoMapaOut } from './diagnostico-mapa.out';
import { SeguimientoMapsOut } from './seguimiento-maps.out';
export interface MapasPacientesPorDiagnosticoOut{ 
    agrupadoPor: DiagnosticoMapaOut;
    contador?: SeguimientoMapsOut []
}

