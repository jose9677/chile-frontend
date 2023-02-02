import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'underscore'

@Pipe({
  name: 'filter2',
  pure:false
})
export class Filter2Pipe implements PipeTransform {

  transform(value2: any[], search2: any, page2: any): any {


    const resultSearch: any[] = value2.filter(res => (res.id_request.toString())?.includes(search2));

    const resultSearch2: any[] = value2.filter(res => res.request_date?.includes(search2));

    const resultSearch3: any[] = value2.filter(res => res.rut_user?.toLowerCase().includes(search2));

    const resultSearch4: any[] = value2.filter(res => res.user_name?.toLowerCase().includes(search2));

    const resultSearch5: any[] = value2.filter(res => res.user_lastname?.toLowerCase().includes(search2));

    const resultSearch6: any[] = value2.filter(res => res.assistant_name?.toLowerCase().includes(search2));

    const resultSearch7: any[] = value2.filter(res => res.assistant_lastname?.toLowerCase().includes(search2));

    const resultSearch8: any[] = value2.filter(res => res.status?.toLowerCase().includes(search2));


    if (search2.length ===0 ) {
      return value2.slice(page2,page2 + 5);
    } else {

      if (resultSearch.length != 0 ) {


        return resultSearch.slice(page2,page2 + 5);

      } else {


        if( resultSearch2.length != 0) {


          return resultSearch2.slice(page2,page2 + 5);

        } else {


          if(resultSearch3.length != 0) {



            return resultSearch3.slice(page2,page2 + 5);
          } else {



            if ( resultSearch4.length != 0) {


              return resultSearch4.slice(page2, page2 +5);
            }else {

              if ( resultSearch5.length != 0 ) {



                return resultSearch5.slice(page2, page2+5);

              } else {



                if ( resultSearch6.length != 0 ) {


                  return resultSearch6.slice(page2, page2 + 5);
                } else {

                  if ( resultSearch7.length != 0) {

                    return resultSearch7.slice(page2, page2 +5);

                  } else {

                    if ( resultSearch8.length != 0 ) {

                      return resultSearch8.slice(page2, page2 +5);

                    }else {

                      return [];
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
