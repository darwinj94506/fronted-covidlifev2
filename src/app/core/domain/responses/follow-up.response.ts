import { FollowUpStateEnum, FollowUpTypeEnum, PatientStateFollowUpEnum} from '../enums'
import { IEntity } from '../entities';
export interface IFollowUpResponse extends IEntity{ 
    temperatura: number;
    saturacionOxigeno: number;
    presionArterial: number;
    patientId: string | number;
    patient: {
        _id: string
        name: string;
        lastname: string;
    }
    type: FollowUpTypeEnum;
    state: FollowUpStateEnum;
    patientState: PatientStateFollowUpEnum; 
    patientNote: string;
    doctorId?: string | number; 
    doctorNote?: string;
}