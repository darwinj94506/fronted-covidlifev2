import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy, Input} from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FilterUserIn } from '../../../../core/domain/inputs';
import { FilterUserOut, VORoleHospitalPopulateOut, VORoleHospitalPopulateLoginOut } from '../../../../core/domain/outputs';
import { Observable } from 'rxjs';
import { UserFacade, MainFacade} from '../../../../store/facade';
import {fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, filter } from 'rxjs/operators';
@Component({
  selector: 'app-search-invite-modal',
  templateUrl: './search-invite-modal.component.html',
  styleUrls: ['./search-invite-modal.component.css']
})
export class SearchInviteModalComponent implements OnInit, AfterViewInit, OnDestroy{
  findedUsers$ : Observable<FilterUserOut[]>;
  isLoading$: Observable<boolean>;
  suscription: Subscription;
  hospitalSession: VORoleHospitalPopulateLoginOut;

  constructor(public modal: NgbActiveModal,
     private _userFacade: UserFacade,
     private _mainFacade: MainFacade) { }
  @ViewChild('input') input: ElementRef;

  ngOnInit(): void {
    this.isLoading$ = this._userFacade.getSearchingUsersFromStorage();
    this.findedUsers$ = this._userFacade.getFindedUsersFromStore(); 
    this._mainFacade.getHospitalSesion()
      .subscribe(hospital=>this.hospitalSession=hospital)
  }

  ngAfterViewInit(){
    this.suscription = fromEvent(this.input.nativeElement,'keyup')
    .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        tap( _ => {
          let filter:FilterUserIn = { emailLike: this.input.nativeElement.value}
          this._userFacade.distpachActionSearchUser(filter)
        })
    )
    .subscribe();
  }

  addToHospital(user: FilterUserOut){
    
      let rolesHospital: VORoleHospitalPopulateOut = { 
        idHospital:{
          _id: this.hospitalSession.idHospital._id,
          nombre: this.hospitalSession.idHospital.nombre,
          idEspacio:this.hospitalSession.idHospital._id
        },
        roles:[]
      }
      this._userFacade.dispatchActionOpenModalAsignarRole(rolesHospital, user._id)
    
  }

  isAdded (user: FilterUserOut):boolean{
    let isResgistered = false;
    user.roles.forEach(element => {
      if(element.idHospital._id === this.hospitalSession.idHospital._id)
        isResgistered = true;
    });
    return isResgistered
  }

  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

}
