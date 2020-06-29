import { BaseOutput } from './base-output';
export interface UserOutput extends BaseOutput {
    name: string;        
    lastname: string;
    email: string;
    role: any[];
}