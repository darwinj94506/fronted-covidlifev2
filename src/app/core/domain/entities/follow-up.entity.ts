import { IEntity } from './entity';
import { FollowUpStateEnum, FollowUpTypeEnum, PatientStateFollowUpEnum } from '../enums';
export interface IFollowUpEntity extends IEntity{
    temperatura:number;
    saturacionOxigeno:number;
    presionArterial:number;
    patientId: number | string;
    type: FollowUpTypeEnum; 
    state: FollowUpStateEnum ; 
    patientState: PatientStateFollowUpEnum;
    patientNote: string;
    doctorId?: number | string;
    doctorNote?: string;
    
} 