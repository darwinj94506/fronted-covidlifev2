import { FiltrarSeguimientoOut } from './filtrar-seguimiento-out';
export interface ItemDragula {
    name: string;
    el: Element;
    target: Element;
    source: Element;
    sibling: Element;
    item: FiltrarSeguimientoOut;
    sourceModel: FiltrarSeguimientoOut[];
    targetModel: FiltrarSeguimientoOut[];
  }