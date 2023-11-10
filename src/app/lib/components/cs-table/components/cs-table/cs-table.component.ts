import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { CsCellTemplateDirective } from '../../directives/cs-table-cell-template.directive';
import {
  CsTableColDef,
  CsTableConfig,
} from '../../interfaces/cs-table.interface';

@Component({
  selector: 'cs-table',
  templateUrl: './cs-table.component.html',
  styleUrls: ['./cs-table.component.scss'],
})
export class CsTableComponent implements AfterViewInit {
  /**table templates to has custom cells */
  @ContentChildren(CsCellTemplateDirective, {
    read: CsCellTemplateDirective,
  })
  templates!: QueryList<CsCellTemplateDirective>;
  @ContentChild('emptyTemplate') emptyTemplate?: TemplateRef<any>;

  /**stores cell templates */
  colTemplates: any[] = [];
  /**tells the parent whe row was clicked */
  @Output() pageChange = new EventEmitter();
  /**tells the parent whe row was clicked */
  @Output() rowClicked = new EventEmitter();
  /**tells the parent when delete action is clicked */
  @Output() deleteItem = new EventEmitter();
  /**tells the parent when edit action is clicked */
  @Output() editItem = new EventEmitter();
  /**data source to be painted */
  /**flag to know if table has sticky header */
  @Input() stickyHead = true;
  /**table config to paint cells */
  @Input() tableConfig: CsTableConfig = {
    colDefs: [],
  };

  @Input('dataSource') set data(value: any[]) {
    this.dataSource = value;
    this.setData();
  }

  dataSource: any[] = [];

  @Input() loading = false;
  @Input() skeletonHeight = '19px';
  @Input() loadingRowsNumber = 0;

  /** pagination data */
  @Input() results = 0;
  @Input() pageSize = 5;
  @Input() totalResults = 0;
  @Input() currentPage = 1;
  @Input() lastPage = 0;

  value: any[] = [];

  /**
   * after view init stores the templates inside the component in an array
   */
  ngAfterViewInit() {
    this.templates.forEach((template) => {
      this.colTemplates.push(template);
    });
  }

  /**
   * on row click tells the parent row was clicked
   * @param row row date
   * @param col col data to know if tells the parent or not thta row was clicked
   */
  rowClick(row: any, col: CsTableColDef) {
    if (col.stopClickPropagation) {
      return;
    }
    this.rowClicked.emit(row);
  }

  /**
   * reusable method tha returns base data paginated
   * @param currentPage current page
   * @param pageSize limit of elements to be shown
   * @param arrayBase information base
   * @returns new array of current page
   */
  getDataPaginated = (
    currentPage: number,
    pageSize: number,
    arrayBase: any[]
  ) => {
    const page = currentPage - 1;
    return arrayBase.slice(page * pageSize, page * pageSize + pageSize);
  };

  setPage(data: { currentPage: number }) {
    this.currentPage = data.currentPage;
    this.setData();
    if (this.tableConfig.pagination && this.tableConfig.serverPagination) {
      this.pageChange.emit({ currentPage: this.currentPage });
    }
  }

  setData() {
    if (this.tableConfig.pagination && !this.tableConfig.serverPagination) {
      this.value = this.getDataPaginated(
        this.currentPage,
        this.pageSize,
        this.dataSource
      );
      this.totalResults = this.dataSource.length;
      this.results = this.value.length;
      this.lastPage = Math.ceil(this.dataSource.length / this.pageSize);
    } else {
      this.value = this.dataSource;
    }
  }
}
