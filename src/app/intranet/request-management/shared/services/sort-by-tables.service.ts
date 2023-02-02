import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',

})
export class SortByTablesService {

  search: any = '';

  page: number = 0;

  dataSort= '';


  order= false


  constructor() {

   }

  nextPage() {
    this.page += 5;

  }

  prevPage() {
    if ((this.page > 0)) {

      this.page -= 5;
    }
  }

  onSearch(search: any) {
    this.search = search;

  }

  dataSortBy(value: any) {
    this.dataSort = value;
    this.order = !this.order

  }



  search2: any = '';

  page2: number = 0;

  dataSort2= '';


  order2= false


  nextPage2() {

    this.page2 += 5;

  }

  prevPage2() {
    if ((this.page2 > 0)) {
      this.page2 -= 5;

    }
  }

  onSearch2(search2: any) {
    this.search2 = search2.toLowerCase();


  }

  dataSortBy2(value2: any) {
    this.dataSort2 = value2;
    this.order2 = !this.order2

  }


}
