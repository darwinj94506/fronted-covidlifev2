import { ParroquiaOutput } from './parroquia-output';
import { BaseOutput } from './base-output'
export interface CantonOutput extends BaseOutput {
    name: string;
    idProvincia?: string;
    parroquias?:ParroquiaOutput[];

} 