import { Pipe, PipeTransform } from '@angular/core';
import { CsTableColDef } from '../interfaces/cs-table.interface';

@Pipe({
  name: 'csTableFormatColumn',
})
export class CsFormatColumnTablePipe implements PipeTransform {
  /**
   *
   * @param value value to format
   * @param colDef column definition
   * @returns value formatred
   */
  transform(value: any, colDef: CsTableColDef) {
    let newValue = value;
    if (colDef && colDef.columnFunctionFormat) {
      newValue = colDef.columnFunctionFormat(newValue);
    }
    return newValue;
  }
}
