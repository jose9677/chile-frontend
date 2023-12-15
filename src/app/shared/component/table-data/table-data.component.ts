import { Component, Input, OnInit, SimpleChange, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { SortByTablesService } from './services/sort-by-tables.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { FilterPipe } from './pipes/filter.pipe';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit {

  @Input() titlesTable: string[];

  @Input() dataInput: any;

  @Input() addNew: any;

  @Input() selections: boolean;

  @Input() options: boolean;

  @Input() actionsTable?: any;

  @Input() dataForPage: any = 5;


  public sortByService: any;

  public titles: any[];

  public customPatterns: any;

  public numColumns: number;

  public pages: any[];

  constructor(

    private modalService: ModalsService,

    ) {

      this.dataInput = [];

      this.titles = [];

      const sortByService = new SortByTablesService;


      this.sortByService = sortByService;

    }


    ngOnChanges( changes: SimpleChanges ) {

      this.viewCheckbox();
      this.getPages();
      this.dataInput = changes.dataInput.currentValue;

      if (this.dataInput.length != 0) {


        if(this.titles.length === 0) this.getTitle();
        this.sortByService.resetTableSearch();

    }

  }

  ngOnInit(): void {

    this.customPatterns= { 'A': { pattern: new RegExp('\[a-zA-Z\+\ñÑ+0-9\+*-/\]')} };

    setTimeout((()=>{

    }), 5000)

  }

  ngAfterContentChecked(): any {

    this.viewCheckbox();

  }

  ngAfterViewChecked(): void {


    // const elements: any = document.querySelector('#data')?.querySelectorAll('ul');

    // const checkbox: any = document.getElementById('tbody')?.querySelectorAll('input');
    // let nclass: any = [];

    // elements?.forEach((element: any, ie: any) => {


    //   nclass.push('a'+ie);


    //   if( ie == (elements.length - 1) ){

    //     checkbox?.forEach((userItem:any, i:any) => {
    //       let nameClass: any = nclass.toString().replace(/,/g," ");
    //       userItem.setAttribute('class',nameClass)
    //     });

    //     console.log(checkbox);

    //   }

    // });

    this.viewCheckbox();

  }

  viewCheckbox() {
    const elements = document.querySelectorAll('.data-td');
    const checkbox = document.querySelectorAll('.tbody');

    // console.log(checkbox);
    // console.log(elements);

    elements?.forEach((td: any) => {

      let nclass: any = [];

      const ul: any = td.querySelectorAll('ul');

      ul.forEach((resUl: any, iu: any) => {

        nclass.push('a'+iu);

        // console.log(checkbox);
        checkbox?.forEach((inputContent:any) => {

          const items: any =inputContent.querySelectorAll('.checkbox');

          items?.forEach((userItem: any) => {

            if( iu == (ul.length - 1) ){

              let nameClass: any = nclass.toString().replace(/,/g," ");
              userItem.setAttribute('class',nameClass);

            }
          });
        });
      });
    });
  }

  getTitle(): any[] {

    let keys = Object.keys(this.dataInput[0]);

    let titles = this.titlesTable;

    titles.map((res1: any)=>{

      this.titles.push({'title': res1});

    })

    this.titles.map((res, i)=>{
      res.key = keys[i];
    })

    return this.titles;

  }

  private dataSearch: any = [];

  getPages(dataInput: any = this.dataSearch) {

    if(dataInput.length === 0) {
      dataInput = this.dataInput
    }

    this.viewCheckbox();

    let pages: any[] = [];
    let dataForPage: number = this.dataForPage;
    let numberPages = dataInput.length/dataForPage;
    let positionPage: number = this.sortByService.positionPage;
    let pagesForList: number = 3;

    for (let i = 0; i < numberPages; i++) {

      pages.push({pageNumber : i+1});

    }

    pages.map((page: any) => {

      if (page.pageNumber === positionPage ) page.active = true;

      if (page.pageNumber > positionPage+pagesForList) page.hidden = true;
      if ((positionPage < (pagesForList*2)+1) && (page.pageNumber < (pagesForList*2)+1)) page.hidden = false;

      if (page.pageNumber < positionPage-pagesForList) page.hidden = true;
      if ((positionPage > pages.length-(pagesForList*2)+1) && (page.pageNumber > pages.length-(pagesForList*2)-1)) page.hidden = false;

    })

    return this.pages = pages;
  }

  // functions

  // newRequest(e: Event) {

  //   e.preventDefault();

  //   this.addressesService.newRequest();

  // }

  // processRequest(e: Event, idRequest: number) {

  //   e.preventDefault();

  //   this.addressesService.processRequest(idRequest);

  // }

  // // viewFile(e: Event) {

  // //   e.preventDefault;

  // //   console.log(e);


  // // }

  // assignRequest(e: Event, idRequest: number){

  //   e.preventDefault();


  //   this.modalService.openModalData(AssignRequestComponent, idRequest);

  // }

  // editRequest(e: Event, idRequest: number){

  //   e.preventDefault();

  //   this.addressesService.editRequest(idRequest);

  // }

  // viewRequest(e: Event, id: number){

  //   e.preventDefault();

  //   this.addressesService.viewRequest(id);

  // }

  // newCitizen(e: Event){

  //   e.preventDefault();

  //   this.addressesService.newCitizen();
  // }


  // editCitizen(e: Event, dataCitizen: string){

  //   e.preventDefault();

  //   this.addressesService.editCitizen(dataCitizen);


  // }

  // removeCitizen(e: Event, i: number){

  //   e.preventDefault();


  //   this.addressesService.removeCitizen(i);

  // }

  // viewMemo(e: Event, numMemo: number){

  //   e.preventDefault();

  //   this.addressesService.viewMemo( numMemo );

  // }

  // editarMemo(e: Event, numMemo: number){

  //   e.preventDefault();

  //   this.addressesService.editMemo( numMemo );

  // }

  // viewCorrections(e: Event, correctionMemo: number){

  //   e.preventDefault();

  //   this.modalService.openModalData2(MemoCorrectionsComponent, correctionMemo, 'view');

  // }

  // newRemissionNote(e: Event) {

  //   e.preventDefault();

  //   this.addressesService.newRemissionNote();


  // }

  // downloadRemissionNote(e: Event, idRemissionNote: number) {

  //   e.preventDefault();

  //   this.addressesService.downloadRemissionNote(idRemissionNote);

  // }

  // editRemissionNote(e: Event, idRemissionNote: number) {

  //   e.preventDefault();

  //   this.addressesService.editRemissionNote(idRemissionNote);

  // }



  // viewRemissionNote(e: Event, idRemissionNote: number) {

  //   e.preventDefault();

  //   this.addressesService.viewRemissionNote(idRemissionNote);

  // }

  // sendRemissionNote(e: Event, idRemissionNote: any) {

  //   e.preventDefault();

  //   this.addressesService.sendRemissionNote(idRemissionNote);

  // }

  // associatedMemorandum(e: Event, memos: string) {

  //   e.preventDefault();

  //   this.modalService.openModalData( AddressesAssociatedMemorandumComponent ,memos);
  // }

  // addMemo(e: Event, dataMemo: string){

  //   e.preventDefault();

  //   this.addressesService.addMemo(e, dataMemo);

  // }

  // viewConstancyDelivery(e: Event, idConstancyDelivery: number) {

  //   e.preventDefault();

  //   this.addressesService.viewConstancyDelivery(idConstancyDelivery);

  // }

  // sendConstancyDelivery(e: Event, idConstancyDelivery: number) {

  //   e.preventDefault();

  //   this.addressesService.sendConstancyDelivery(idConstancyDelivery);

  // }

  // downloadConstancyDelivery(e: Event, idConstancyDelivery: number ) {

  //   e.preventDefault();

  //   this.addressesService.downloadConstancyDelivery(idConstancyDelivery);

  // }


  viewDetail(e: any, id_request: any) {

    this.dataInput.map((res: any, i: any) => {

      if (res['Nro.'] === id_request) {

        res.hidden= e.target.checked;

      }

      // if (i === id) {

      //   res.hidden= e.target.checked;

      // }
    })
  }

  search(textSearch: any) {
    console.log(textSearch);

    let data = [];

    this.sortByService.onSearch(textSearch);

    let filter = new FilterPipe

    data = filter.transform(this.dataInput, this.sortByService.search, this.sortByService.page, this.titles, 100);

    console.log(this.dataInput);
    console.log(data);

    // this.pages = data;

    this.sortByService.getPage(1);


    if (textSearch.length === 0) {

      this.getPages(this.dataInput);
      this.dataSearch = [];

    }

    if (textSearch.length != 0) {

      this.dataSearch = data;

      this.getPages(this.dataSearch);

    }


  }



}
