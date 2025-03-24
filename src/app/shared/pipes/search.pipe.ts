import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  //This Pipe For Search
  // transform(data:any[], searchKey:string):any[] {
  //   return data.filter(current => current.title.toLowerCase())  ;
  // }


  transform(data: any[], searchKey: string):any[] {
    if (!data || !searchKey) {
      return data;
    }
    return data.filter(current => current.title.toLowerCase().includes(searchKey.toLowerCase()));
  }



  
  }
//
