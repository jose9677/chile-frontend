import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'underscore'

@Pipe({
  name: 'filter',
  pure: false
})

export class FilterPipe implements PipeTransform {

  public transform(value: any[], search: any, page: number, titles: any, itemsForPage: any): any[] {


    let pageNumber: number = page + itemsForPage;
    
    const resultSearch: any[] = value.filter(res => res[titles[titles.key!='' ? 0 : 0]?.key]?.toString()?.toUpperCase()?.includes(search));

    const resultSearch2: any[] = value.filter(res => res[titles[titles.key!='' ? 1 : 0]?.key]?.toString()?.toUpperCase()?.includes(search));

    const resultSearch3: any[] = value.filter(res => res[titles[titles.key!='' ? 2 : 0]?.key]?.toString()?.toUpperCase()?.includes(search));

    const resultSearch4: any[] = value.filter(res => res[titles[titles.key!='' ? 3 : 0]?.key]?.toString()?.toUpperCase()?.includes(search)); 

    const resultSearch5: any[] = value.filter(res => res[titles[titles.key!='' ? 4 : 0]?.key]?.toString()?.toUpperCase()?.includes(search));    

    const resultSearch6: any[] = value.filter(res => res[titles[ titles.key!='' ? 5 : 0]?.key]?.toString()?.toUpperCase()?.includes(search));    
    
    const resultSearch7: any[] = value.filter(res => res[titles[ titles.key!='' ? 6 : 0]?.key]?.toString()?.toUpperCase()?.includes(search));    

    const resultSearch8: any[] = value.filter(res => res[titles[ titles.key!='' ? 7 : 0]?.key]?.toString()?.toUpperCase()?.includes(search));    
    
    const resultSearch9: any[] = value.filter(res => res[titles[ titles.key!='' ? 8 : 0]?.key]?.toString()?.toUpperCase()?.includes(search));    

    
    
    if (search.length ===0) {
      
      value = value.slice(page, pageNumber);  

      return value;

    } else {

      if (resultSearch.length != 0 ) {
        
        return resultSearch.slice(page, pageNumber);
        
      } else {
        
        if( resultSearch2.length != 0) {
          
          return resultSearch2.slice(page, pageNumber);
          
        } else {
          
          if(resultSearch3.length != 0) {

            return resultSearch3.slice(page, pageNumber);
            
          } else {          
            
            if(resultSearch4.length != 0) {

              return resultSearch4.slice(page, pageNumber);

            } else {          

              if(resultSearch5.length != 0) {
                
                return resultSearch5.slice(page, pageNumber);
                
              } else {          
                
                if(resultSearch6.length != 0) {
                  
                  return resultSearch6.slice(page, pageNumber);
                  
                } else {          
      
                  if(resultSearch7.length != 0) {
                    
                    return resultSearch7.slice(page, pageNumber);
                    
                  } else {          
        
                    if(resultSearch8.length != 0) {
                      
                      return resultSearch8.slice(page, pageNumber);
                      
                    } else {          
                      
                      if(resultSearch9.length != 0) {

                        return resultSearch9.slice(page, pageNumber);
            
                      } else {          
            
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
}

