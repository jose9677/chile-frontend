import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'underscore'

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], search: any, page: any): any[] {

    if (search.length ===0 ) {
      return value.slice(page,page + 5);
    }


    const resultSearch = value.filter(res => res.nroRequest?.toLowerCase().includes(search));

    const resultSearch2 = value.filter(res => res.fonasa?.toLowerCase().includes(search));

    const resultSearch3 = value.filter(res => res.visitor?.toLowerCase().includes(search));



    if( resultSearch.length === 0 && resultSearch2.length != 0) {

      return resultSearch2.slice(page,page + 5);

    }
    else if(resultSearch.length === 0 && resultSearch3.length != 0) {

      return resultSearch3.slice(page,page + 5);

    }else {

      return resultSearch.slice(page,page + 5);
    }

  }

}
