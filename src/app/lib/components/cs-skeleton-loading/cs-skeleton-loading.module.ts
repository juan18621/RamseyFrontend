import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsSkeletonLoadingComponent } from './components/cs-skeleton-loading/cs-skeleton-loading.component';

@NgModule({
  declarations: [CsSkeletonLoadingComponent],
  imports: [CommonModule],
  exports: [CsSkeletonLoadingComponent],
})
export class CsSkeletonLoadingModule {}
