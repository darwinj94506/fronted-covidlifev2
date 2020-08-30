import { objMapSegItem } from './obj-map-seg-item';
import { FechaDiagnosticoMapOut } from './fecha-diagnostico-map.out'
export interface MapasPacientesPorDiaPorDiagnosticoOut {
    agrupadoPor: FechaDiagnosticoMapOut;
    contador?: objMapSegItem []
}