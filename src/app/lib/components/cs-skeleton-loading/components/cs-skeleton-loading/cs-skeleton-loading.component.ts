import { Component, Input } from '@angular/core';

@Component({
  selector: 'cs-skeleton-loading',
  templateUrl: './cs-skeleton-loading.component.html',
  styleUrls: ['./cs-skeleton-loading.component.scss'],
})
export class CsSkeletonLoadingComponent {
  /**style attributes */
  @Input() width = '150px';
  @Input() height = '19px';
  @Input() borderRadius = '10px';
  @Input() skeletonStyle = {};

  get ngStyle() {
    return {
      width: this.width,
      height: this.height,
      borderRadius: this.borderRadius,
      ...this.skeletonStyle,
    };
  }
}
