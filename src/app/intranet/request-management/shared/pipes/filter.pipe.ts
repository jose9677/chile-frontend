import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'underscore'

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], search: any, page: number): any[] {


    const resultSearch: any[] = value.filter(res => (res.id_request.toString())?.includes(search));

    const resultSearch2: any[] = value.filter(res => res.request_date?.includes(search));

    const resultSearch3: any[] = value.filter(res => res.rut_user?.toLowerCase().includes(search));

    const resultSearch4: any[] = value.filter(res => res.user_name?.toLowerCase().includes(search));

    const resultSearch5: any[] = value.filter(res => res.user_lastname?.toLowerCase().includes(search));

    const resultSearch6: any[] = value.filter(res => res.assistant_name?.toLowerCase().includes(search));

    const resultSearch7: any[] = value.filter(res => res.assistant_lastname?.toLowerCase().includes(search));

    const resultSearch8: any[] = value.filter(res => res.status?.toLowerCase().includes(search));


    if (search.length ===0 ) {
      return value.slice(page, page + 5);
    } else {

      if (resultSearch.length != 0 ) {


        return resultSearch.slice(page,page + 5);

      } else {


        if( resultSearch2.length != 0) {


          return resultSearch2.slice(page,page + 5);

        } else {


          if(resultSearch3.length != 0) {



            return resultSearch3.slice(page,page + 5);
          } else {



            if ( resultSearch4.length != 0) {


              return resultSearch4.slice(page, page +5);
            }else {

              if ( resultSearch5.length != 0 ) {



                return resultSearch5.slice(page, page+5);

              } else {



                if ( resultSearch6.length != 0 ) {


                  return resultSearch6.slice(page, page + 5);
                } else {

                  if ( resultSearch7.length != 0) {

                    return resultSearch7.slice(page, page +5);

                  } else {

                    if ( resultSearch8.length != 0 ) {

                      return resultSearch8.slice(page, page +5);

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
