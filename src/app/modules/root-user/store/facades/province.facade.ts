import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actionsProvinces from '../actions/province.actions';
import { getProvinceState } from '../reducers/province.reducers';
// import { PaymentMethod, PaymentMethods } from './payment-method.model';
// import * as PaymentMethodSelectors from './payment-method.selectors';

@Injectable({
  providedIn: 'root'
})
export class ProvinceFacade {
  constructor(private store: Store<any>) {}

  public loadProvinces() {
    this.store.dispatch(actionsProvinces.loadProvinces());
  }

  public addProvince(newProvince: any) {
    this.store.dispatch(
      actionsProvinces.createProvince({ province: { ...newProvince } })
    );
  }

  public openModal( targetHtml, province ){
    this.store.dispatch(
      actionsProvinces.openModal({ targetHtml })
    )
  }

  public closeModal(){
    this.store.dispatch(
      actionsProvinces.closeModal()
    )
  }


//   public selectPreferredPaymentMethod(preferredId: string) {
//     this.store.dispatch(
//       provinceActions.selectPreferredPaymentMethod({ preferredId })
//     );
//   }
//   public setExpirationPaymentMethod(updatedPaymentMethod: PaymentMethod) {
//     this.store.dispatch(
//       provinceActions.setExpirationPaymentMethod({
//         updatedPaymentMethod: { ...updatedPaymentMethod }
//       })
//     );
//   }

  public getPaymentMethodsList(): Observable<any> {
    return this.store.select(getProvinceState)
  }

//   public getPreferredPaymentMethod$(): Observable<string> {
//     return this.store.select(PaymentMethodSelectors.getPreferredPaymentMethod);
//   }
}