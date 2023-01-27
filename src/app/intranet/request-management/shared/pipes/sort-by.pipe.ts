import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore'

@Pipe({
  name: 'sortBy',
  pure: false
})
export class SortByPipe implements PipeTransform {

  transform(valueData: Array<any>, dataSort: any, order: boolean): Array<any> {
    if(!valueData){return []}

    if(order){

      return _.sortBy(valueData, function(value){ return  value[dataSort];}).reverse();

    }else {

      return _.sortBy(valueData, function(value){ return  value[dataSort];});

    }

  }

}
