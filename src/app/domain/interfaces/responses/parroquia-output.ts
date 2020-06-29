import { BaseOutput } from './base-output';
export interface ParroquiaOutput extends BaseOutput {
    name: string;
    idCanton?: string;
}