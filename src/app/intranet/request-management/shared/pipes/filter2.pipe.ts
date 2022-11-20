import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter2',
  pure:false
})
export class Filter2Pipe implements PipeTransform {

  transform(value2: any[], search2: any, page2: any): any[] {

    if (search2.length ===0 ) {
      return value2.slice(page2,page2 + 5);
    }


    const resultSearch = value2.filter(res=> res.nroRequest.toLowerCase().includes(search2));

    const resultSearch2 = value2.filter(res => res.comune.toLowerCase().includes(search2));

    const resultSearch3 = value2.filter(res => res.visitor.toLowerCase().includes(search2));



    if( resultSearch2.length === 0 && resultSearch2.length != 0) {

      return resultSearch2.slice(page2,page2 + 5);

    }
    else if(resultSearch2.length === 0 && resultSearch2.length != 0) {

      return resultSearch2.slice(page2,page2 + 5);

    }else {

      return resultSearch.slice(page2,page2 + 5);
    }

  }


}
