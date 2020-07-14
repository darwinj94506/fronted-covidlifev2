import { IFollowUpEntity } from '../domain/entities';
import { IFollowUpResponse } from '../domain/responses';
import { IFollowUpInput } from '../domain/inputs';
import { Mapper } from '../base/mapper';

export class FollowUpRepositoryMapper extends Mapper <IFollowUpInput | IFollowUpResponse, IFollowUpEntity | null> {
  mapFrom(object: IFollowUpInput | IFollowUpResponse ): IFollowUpEntity {
    
    return {
      _id: object._id,  
      temperatura: object.temperatura,
      saturacionOxigeno: object.saturacionOxigeno,
      presionArterial: object.presionArterial,
      patientId: object.patientId,
      patientNote:object.patientNote,
      doctorId: object.doctorId,
      state: object.state,
      patientState: object.patientState,
      type: object.type,
      createdAt: object.createdAt,
      editedAt:object.editedAt
    };
  }

  mapTo(object: IFollowUpEntity): IFollowUpResponse | null {
    return null
  }
}
