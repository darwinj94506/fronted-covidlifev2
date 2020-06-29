import { BaseOutput } from './base-output'
export interface UserLogged extends BaseOutput {
    name: string;        
    lastname: string;   
    email: string;  
    menu: any[];
    role: any[];
}