import { Component, OnInit,OnDestroy } from '@angular/core';
import { MainFacade } from '../store/facade/main.facade';
import { Subscription } from 'rxjs';
import { LoginOut, VORoleHospitalPopulateLoginOut } from '../core/domain/outputs';
declare var $: any;
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit,OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  tabStatus = 'justified';
  public isCollapsed = false;
  public innerWidth: any;
  public defaultSidebar: any;
  public showSettings = false;
  public showMobileMenu = false;
  public expandLogo = false;

  options = {
    theme: 'light', // two possible values: light, dark
    dir: 'ltr', // two possible values: ltr, rtl
    layout: 'vertical', // fixed value. shouldn't be changed.
    sidebartype: 'full', // four possible values: full, iconbar, overlay, mini-sidebar
    sidebarpos: 'fixed', // two possible values: fixed, absolute
    headerpos: 'fixed', // two possible values: fixed, absolute
    boxed: 'full', // two possible values: full, boxed
    navbarbg: 'skin6', // six possible values: skin(1/2/3/4/5/6)
    sidebarbg: 'skin5', // six possible values: skin(1/2/3/4/5/6)
    logobg: 'skin6' // six possible values: skin(1/2/3/4/5/6)
  };

  Logo() {
    this.expandLogo = !this.expandLogo;
  }


  userLogged: LoginOut;
  suscription: Subscription;

  constructor( private _mainFacade: MainFacade) { }

  ngOnInit(): void {
    this.suscription = this._mainFacade.getUserLogged()
      .subscribe(userLogged=>this.userLogged=userLogged);
  }

  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  selectHospital(hospital:VORoleHospitalPopulateLoginOut){
    this._mainFacade.setHospitalSession(hospital);
  }
  
  toggleSidebarType() {
    switch (this.options.sidebartype) {
      case 'full':
      case 'iconbar':
        this.options.sidebartype = 'mini-sidebar';
        break;

      case 'overlay':
        this.showMobileMenu = !this.showMobileMenu;
        break;

      case 'mini-sidebar':
        if (this.defaultSidebar === 'mini-sidebar') {
          this.options.sidebartype = 'full';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }

}
