import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserPerfilOut } from '../../../../core/domain/outputs';
import { IdIn } from '../../../../core/domain/inputs';
import { UserFacade, MainFacade } from '../../../../store/facade';
import { Observable, Subscription } from 'rxjs';
@Component({
  templateUrl: 'profile-page.component.html'
})

export class ProfilePageComponent implements OnInit, OnDestroy {
  suscripcion: Subscription;
  userPerfil$: Observable<UserPerfilOut>
  userPerfil: UserPerfilOut;
  isLoadingPerfil$:Observable<boolean>;
  constructor( private _userFacade: UserFacade, 
               private _mainFacade: MainFacade ) {}

  ngOnInit(){
    this.isLoadingPerfil$ = this._userFacade.getLoadingMiPerfilStore()
    this._mainFacade.getUserLogged()
      .subscribe(userLogged => {
        let id: IdIn = { _id: userLogged._id }
        this._userFacade.loadMiPerfil(id)
      })

      this.suscripcion = this._userFacade.getMiPerfil()
        .subscribe(data=>{
          this.userPerfil = data;
      })

    // this.userPerfil$ = this._userFacade.getMiPerfil()
  } 

  ngOnDestroy(){
    this.suscripcion.unsubscribe();
  }

}
