import { DiagnosticoMapaOut } from './diagnostico-mapa.out';
import { objMapSegItem } from './obj-map-seg-item';
export interface MapasPacientesPorDiagnosticoOut{ 
    agrupadoPor: DiagnosticoMapaOut;
    contador?: objMapSegItem []
}

