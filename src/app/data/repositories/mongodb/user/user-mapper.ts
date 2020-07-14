import { IUserResponse } from '../../../../core/domain/responses';
import { IUserEntity } from '../../../../core/domain/entities/user.entity';
import { Mapper } from '../../../../core/base/mapper';

export class UserMapper extends Mapper <IUserResponse, IUserEntity> {
  mapFrom(param: IUserResponse): IUserEntity {
    return {
      name: param.name,
      lastname: param.lastname,
      password: '',
      email: param.email
    };
  }

  mapTo(param: IUserEntity): IUserResponse {
    return {
        name: param.name,
        lastname: param.lastname,
        email: param.email,
    };
  }
}
