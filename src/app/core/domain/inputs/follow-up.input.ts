import { FollowUpStateEnum, FollowUpTypeEnum, PatientStateFollowUpEnum } from '../enums';
import { IEntity } from '../entities';

export interface IFollowUpInput extends IEntity{
    temperatura: number,
    saturacionOxigeno: number,
    presionArterial: number,
    patientId: number,
    type: FollowUpTypeEnum,
    state: FollowUpStateEnum,
    patientState: PatientStateFollowUpEnum,
    patientNote: string,
    doctorId?:number,
    doctorNote?:string
}