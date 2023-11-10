import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cs-table-pagination',
  templateUrl: './cs-table-pagination.component.html',
  styleUrls: ['./cs-table-pagination.component.scss'],
})
export class CsTablePaginationComponent implements OnInit {
  /**tells the parent whe page change */
  @Output() pageChange = new EventEmitter();
  /** pagination data */
  @Input() results = 0;
  @Input() totalResults = 0;
  @Input() currentPage = 1;
  @Input() lastPage = 1;
  @Input() pageSize = 0;

  pagesArray: any[] = [];

  ngOnInit(): void {
    this.setPages();
  }

  setPages() {
    let initialVisiblePage = 0;

    if (this.currentPage > 2) {
      if (this.currentPage === this.lastPage) {
        initialVisiblePage = this.currentPage - 5;
      } else if (this.currentPage === this.lastPage - 1) {
        initialVisiblePage = this.currentPage - 4;
      } else {
        initialVisiblePage = this.currentPage - 3;
      }
    }

    const lastVisiblePage = this.currentPage <= 2 ? 5 : this.currentPage + 2;
    this.pagesArray = Array.from(
      { length: this.lastPage },
      (_, i) => i + 1
    ).slice(initialVisiblePage, lastVisiblePage);
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
