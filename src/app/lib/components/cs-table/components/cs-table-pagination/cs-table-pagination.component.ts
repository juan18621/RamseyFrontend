import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cs-table-pagination',
  templateUrl: './cs-table-pagination.component.html',
  styleUrls: ['./cs-table-pagination.component.scss'],
})
export class CsTablePaginationComponent implements OnInit {
  @Output() pageChange = new EventEmitter();

  @Input() totalResults = 0;
  @Input() currentPage = 1;
  @Input() lastPage = 1;
  @Input() pageSize = 0;
  @Input() showPaginationText = true;

  pagesArray: any[] = [];

  ngOnInit(): void {
    this.setPages();
  }

  setPages() {
    const pageCount = Math.ceil(this.totalResults / this.pageSize);

    this.lastPage = pageCount;

    this.pagesArray = Array.from({ length: pageCount }, (_, i) => i + 1).slice(
      0,
      pageCount
    );

    this.pagesArray = this.getRange(this.pagesArray, this.currentPage);
  }

  getRange(arr: any[], currentPage: number, count = 5) {
    if (arr.length <= 5)
      return Array.from(Array(arr.length).keys()).map((r) => {
        return r + 1;
      });
    let diff = 0;
    const result = [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
    if (result[0] < 3) {
      diff = 1 - result[0];
    }
    if ((result.slice(-1) as any) > arr.length - 2) {
      diff = arr.length - (result.slice(-1) as any);
    }
    return result.map((r) => {
      return r + diff;
    });
  }

  /**
   * manage pagination
   * @param direction checks to go back or next in pagination
   */
  pagination(direction: 'previous' | 'next') {
    if (direction === 'previous') {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    } else if (direction === 'next') {
      if (this.currentPage < this.lastPage) {
        this.currentPage++;
      }
    }
    this.changePage();
  }

  changePage(currentPage?: number) {
    if (currentPage) {
      this.currentPage = currentPage;
    }
    this.setPages();
    this.pageChange.emit({ currentPage: this.currentPage });
  }
}
