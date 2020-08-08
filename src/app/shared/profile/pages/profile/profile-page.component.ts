import { Component, OnInit} from '@angular/core';
import { UserPerfilOut } from '../../../../core/domain/outputs';
import { IdIn } from '../../../../core/domain/inputs';
import { UserFacade, MainFacade } from '../../../../store/facade';
import { Observable } from 'rxjs';
@Component({
  templateUrl: 'profile-page.component.html'
})

export class ProfilePageComponent implements OnInit {

  userPerfil$: Observable<UserPerfilOut>
  constructor( private _userFacade: UserFacade, private _mainFacade: MainFacade ) {}

  ngOnInit(){

    this._mainFacade.getUserLogged()
      .subscribe(userLogged => {
        let id: IdIn = { _id: userLogged._id }
        this._userFacade.loadMiPerfil(id)
      })

    this.userPerfil$ = this._userFacade.getMiPerfil()
  } 

}
