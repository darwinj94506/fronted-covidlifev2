import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy} from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FilterUserIn } from '../../../../core/domain/inputs';
import { FilterUserOut } from '../../../../core/domain/outputs';
import { Observable } from 'rxjs';
import { UserFacade } from '../../../../store/facade';
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

  constructor(public modal: NgbActiveModal, private _userFacade: UserFacade) { }
  @ViewChild('input') input: ElementRef;

  ngOnInit(): void {
    this.isLoading$ = this._userFacade.getSearchingUsersFromStorage();
    this.findedUsers$ = this._userFacade.getFindedUsersFromStore(); 
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

  addToHospital(user){

  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

}
