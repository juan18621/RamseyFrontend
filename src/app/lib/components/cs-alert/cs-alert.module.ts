import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsAlertComponent } from './components/cs-alert/cs-alert.component';
import { CsAlertLoadingComponent } from './components/cs-alert-loading/cs-alert-loading.component';

@NgModule({
  declarations: [CsAlertComponent, CsAlertLoadingComponent],
  imports: [CommonModule],
  exports: [CsAlertComponent, CsAlertLoadingComponent],
})
export class CsAlertModule {}
