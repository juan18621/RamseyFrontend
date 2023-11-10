import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsTableComponent } from './components/cs-table/cs-table.component';
import { CsTablePaginationComponent } from './components/cs-table-pagination/cs-table-pagination.component';
import { CsCellTemplateDirective } from './directives/cs-table-cell-template.directive';
import { CsTableObjectPathPipe } from './pipes/cs-table-object-path.pipe';
import { CsFormatColumnTablePipe } from './pipes/cs-table-format-column.pipe';
import { CsPagination } from './components/cs-pagination/cs-pagination.component';

@NgModule({
  declarations: [
    CsTableComponent,
    CsTablePaginationComponent,
    CsCellTemplateDirective,
    CsTableObjectPathPipe,
    CsFormatColumnTablePipe,
  ],
  imports: [CommonModule, CsPagination],
  exports: [
    CsTableComponent,
    CsTablePaginationComponent,
    CsCellTemplateDirective,
  ],
})
export class CsTableModule {}
