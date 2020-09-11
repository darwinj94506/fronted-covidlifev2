import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { ROUTES_ADMIN, ROUTES_ROOT, ROUTES_DOCTOR, ROUTES_DIRECTOR, ROUTES_PATIENT } from './menu-by-rol';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MainFacade } from '../../store/facade/main.facade';
import { RolesUserEnum } from '../../core/domain/enums';
import { forkJoin } from 'rxjs';
import { LoginOut, VORoleHospitalPopulateLoginOut } from '../../core/domain/outputs';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  userLogged: LoginOut;
  hospitalSession: VORoleHospitalPopulateLoginOut;
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
     
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  constructor(
    private modalService: NgbModal,
    private _router: Router,
    private route: ActivatedRoute,
    private _mainFacade: MainFacade
  ) {}

  // End open close
  ngOnInit() {

    forkJoin(this._mainFacade.getUserLogged(), this._mainFacade.getHospitalSesion())
        .subscribe(([userLogged, hospitalSesion])=> {
          this.hospitalSession = hospitalSesion
          this.userLogged = userLogged;
          if(userLogged.isRoot)
             this.sidebarnavItems = this.getMenu([RolesUserEnum.ROOT]);
          else this.sidebarnavItems = this.getMenu(hospitalSesion.roles);
          this.sidebarnavItems=[...ROUTES, ...this.sidebarnavItems]

        })
    }

    

    getMenu(roles: RolesUserEnum[]): RouteInfo[]{
      let menu:RouteInfo[] = [];
      roles.forEach(rol=> {
        switch (rol) {
          case RolesUserEnum.ROOT:
            menu = [ ...menu, ...ROUTES_ROOT ]
            break;
          case RolesUserEnum.ADMIN:
            menu = [ ...menu, ...ROUTES_ADMIN ]
            break;
          case RolesUserEnum.DOCTOR:
            menu = [...menu, ...ROUTES_DOCTOR ]
            break;
          case RolesUserEnum.DIRECTOR:
            menu = [...menu, ...ROUTES_DIRECTOR ]
            break;
          case RolesUserEnum.PACIENTE:
            menu = [ ...menu, ...ROUTES_PATIENT ]
            break;
        }
      })
      return menu
    }

    cambiarHospital(){
      this._router.navigate(['/inicio']);
    }
 
    logout(){
      this._mainFacade.logout();
    }

    goToPerfil(){
      this._router.navigate(['/perfil']);
    }

   
}
