import { Entity } from './entity'
export interface User extends Entity{
  _name: string;
  _lastname: string;
  _email: string;
  _password?: string;
}

  // id: number;
  // Name: string;
  // Position: string;
  // Email: string;
  // imagePath:string;
  // Mobile: number;
  // DateOfJoining: Date;
  // Salary: number;
  // Projects: number;
  // _hospital:HospitalPerfil[];    
