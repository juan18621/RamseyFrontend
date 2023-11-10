export interface CsPaginationConfig {
  currentPage: number;
  results: number;
  lastPage: number;
  paginationSize: number;
  localPagination: boolean;
}

export interface CsTableConfig {
  paginationConfig?: any;
  actionsTitle?: string | null;
  colDefs: CsTableColDef[];
  hideHeader?: boolean;
  hideRowPointer?: boolean;
  pagination?: boolean;
  serverPagination?: boolean;
}
export interface CsTableLoadingConfig {
  loadingData: boolean;
  rowsNumber?: number;
  skeletonHeight?: string;
}

export interface CsTableColDef {
  name: string;
  displayName: string;
  headerTemplateName?: string;
  columnFunctionFormat?: any;
  columnTemplateName?: string;
  stopClickPropagation?: boolean;
  columnStyle?: any;
  headerStyle?: any;
}
