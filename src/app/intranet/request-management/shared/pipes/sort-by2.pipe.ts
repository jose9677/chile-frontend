import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore'

@Pipe({
  name: 'sortBy2'
})
export class SortBy2Pipe implements PipeTransform {

  transform(valueData2: Array<any>, dataSort2: any, order: boolean): Array<any> {
    if(!valueData2){return []}

    if(order){

      return _.sortBy(valueData2, function(value){ return  value[dataSort2];}).reverse();

    }else {

      return _.sortBy(valueData2, function(value){ return  value[dataSort2];});

    }

  }

}
