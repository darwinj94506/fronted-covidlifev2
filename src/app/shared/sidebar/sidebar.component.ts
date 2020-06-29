import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { ROUTES_ADMIN, ROUTES_ROOT, ROUTES_DOCTOR, ROUTES_DIRECTOR, ROUTES_PATIENT } from './menu-by-rol';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // End open close
  ngOnInit() {
    // this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem); solo esta línea estaba
    this.sidebarnavItems = this.getMenu(['ROOT_ROLE', 'ADMIN_ROLE', 'DOCTOR_ROLE','DIRECTOR_ROLE', 'PATIENT_ROLE']);
  }

  getMenu(roles:string[]): RouteInfo[]{
    let menu:RouteInfo[] = [];
    roles.forEach(rol=> {
      switch (rol) {
        case 'ROOT_ROLE' :
          menu = [ ...menu, ...ROUTES_ROOT ]
          break;
        case 'ADMIN_ROLE':
          menu = [ ...menu, ...ROUTES_ADMIN ]
          break;
        case 'DOCTOR_ROLE':
          menu = [...menu, ...ROUTES_DOCTOR ]
          break;
        case 'DIRECTOR_ROLE':
          menu = [...menu, ...ROUTES_DIRECTOR ]
          break;
        case 'PATIENT_ROLE':
          menu = [ ...menu, ...ROUTES_PATIENT ]
          break;
      }
    })
    return menu
   
  }
}
