import { GenericRepository } from './generic-repository';
import { IFollowUpEntity } from '../domain/entities';
import { FollowUpStateEnum, FollowUpTypeEnum} from '../domain/enums';
export abstract class FollowUpRepository extends GenericRepository<IFollowUpEntity> {

    abstract getFollowUpsByState(state: FollowUpStateEnum): any
    abstract getFolloWUpsByType(type: FollowUpTypeEnum, state: FollowUpStateEnum): any
       
}