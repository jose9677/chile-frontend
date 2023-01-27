import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTableNeighbor',
  pure:false
})
export class FilterTableNeighborPipe implements PipeTransform {

  transform(value: any[], search: any, page: number): any[] {

    console.log(value);

    const resultSearch: any[] = value.filter(res => (res.id_request.toString())?.includes(search));

    const resultSearch2: any[] = value.filter(res => res.request_date?.includes(search));

    const resultSearch3: any[] = value.filter(res => res.prevention_type?.toLowerCase().includes(search));

    const resultSearch4: any[] = value.filter(res => res.prevention_detail?.toLowerCase().includes(search));

    const resultSearch5: any[] = value.filter(res => res.visit_date?.toLowerCase().includes(search));

    const resultSearch6: any[] = value.filter(res => res.assistant_names?.toLowerCase().includes(search));

    const resultSearch7: any[] = value.filter(res => res.assistant_lastname?.toLowerCase().includes(search));

    const resultSearch8: any[] = value.filter(res => res.status?.toLowerCase().includes(search));


    if (search.length ===0 ) {
      return value.slice(page,page + 5);
    } else {

      if (resultSearch.length != 0 ) {

        console.log(1);

        return resultSearch.slice(page,page + 5);

      } else {
        console.log(2);


        if( resultSearch2.length != 0) {
        console.log(2);


          return resultSearch2.slice(page,page + 5);

        } else {
          console.log(3);


          if(resultSearch3.length != 0) {

            console.log(3);


            return resultSearch3.slice(page,page + 5);
          } else {

            console.log(4);


            if ( resultSearch4.length != 0) {

              console.log(4);

              return resultSearch4.slice(page, page +5);
            }else {
              console.log(5);

              if ( resultSearch5.length != 0 ) {

              console.log(5);


                return resultSearch5.slice(page, page+5);

              } else {



                if ( resultSearch6.length != 0 ) {

              console.log(6);

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
