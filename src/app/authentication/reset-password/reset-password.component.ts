import { Component, OnInit } from '@angular/core';
import { ResetearContraseniaUsecase } from "../../core/usecases";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password: String="";
  confirmPassword: String="";
  resetLink: String=""; 
  constructor( private _resetearContraseniaUsecase:ResetearContraseniaUsecase,
               private _router: Router,
               private _spinner: NgxSpinnerService,
               private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.rutaActiva.queryParams.subscribe(params=>{
      this.resetLink = params['token'];
    });
  }

  cambiarContrasenia(){
    if(this.password != this.confirmPassword){
      alert("Las contraseñas no coinciden");
      return false;
    }
    this._spinner.show();
    console.log([ this.password, this.resetLink ]);
    this._resetearContraseniaUsecase
      .execute({nueva_contrasenia: this.password, 
        resetlink: this.resetLink})
        .subscribe(data=>{
          this._spinner.hide();
          alert("Por favor inicie sesión");
          this._router.navigate(['/authentication/login']);
        },err=>{
          console.log(err);
          this._spinner.hide();
          alert(err);
        })
  }

}
