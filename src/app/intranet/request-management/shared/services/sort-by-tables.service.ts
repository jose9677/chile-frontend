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
    if((this.page <= 5)) {
      this.page += 5;
      console.log(this.page)
    }

  }

  prevPage() {
    if ((this.page > 0)) {

      this.page -= 5;
      console.log(this.page)
    }
  }

  onSearch(search: any) {
    this.search = search;
    console.log(search)

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
    if((this.page2 <= 5)) {
      this.page2 += 5;
      console.log(this.page2)
    }

  }

  prevPage2() {
    if ((this.page2 > 0)) {

      this.page2 -= 5;
      console.log(this.page2)
    }
  }

  onSearch2(search2: any) {
    this.search2 = search2.toLowerCase();
    console.log(this.search2)


  }

  dataSortBy2(value2: any) {
    this.dataSort2 = value2;
    this.order2 = !this.order2

  }


}
