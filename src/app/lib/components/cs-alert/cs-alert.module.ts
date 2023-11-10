import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsAlertLoadingComponent } from './components/cs-alert-loading/cs-alert-loading.component';
import { CsAlertComponent } from './components/cs-alert/cs-alert.component';

@NgModule({
  declarations: [CsAlertLoadingComponent, CsAlertComponent],
  exports: [CsAlertLoadingComponent, CsAlertComponent],
  imports: [CommonModule],
})
export class CsAlertModule {}
