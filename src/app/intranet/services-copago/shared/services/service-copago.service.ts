import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceCopagoService {

  private listServicesCopago: any[];



  constructor() {
    this.listServicesCopago = [];
   }

   addServices( typeService: any, nameService: any, amountServices: any) {
    this.listServicesCopago.push({"typeService": typeService, "nameService": nameService, "amountServices": amountServices})

    console.log(this.listServicesCopago);

   }

   getSetvice() {
    return this.listServicesCopago
   }

}


