import { Injectable } from '@angular/core';

@Injectable({

  providedIn: 'root',

})
export class SortByTablesService {

  search: any = '';

  page: number = 0;

  positionPage: any = 1;

  dataSort= '';


  order= false;


  constructor() {

   }

  nextPage(e: Event, itemsForPage: any) {

    e.preventDefault();
    this.page += itemsForPage;
    this.positionPage += 1;

  }

  prevPage(e: Event, itemsForPage: any) {

    e.preventDefault();

    if ((this.page > 0)) {

      this.page -= itemsForPage;
      this.positionPage -= 1;

    }
  }

  getPage(positionPage: any) {
    this.page = ((positionPage-1)*10);
    this.positionPage = positionPage;

  }

  finishPage(maxPages: any){
    if (this.positionPage === maxPages) {
      return true;
    }

    return false;
  }

  onSearch(search: any) {

    this.search = search.toUpperCase();

  }

  dataSortBy1(value: any, e: Event) {

    e.preventDefault();

    this.dataSort = value;
    this.order = true;

  }

  dataSortBy0(value: any, e: Event) {

    e.preventDefault();

    this.dataSort = value;
    this.order = false;

  }


  resetTableSearch(): void {

    this.search = '';
    this.onSearch('');
    this.page = 0;
    this.dataSort = this.search;
    this.order= false;


  }

}
