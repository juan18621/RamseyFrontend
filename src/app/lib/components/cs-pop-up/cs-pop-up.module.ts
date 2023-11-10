import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsPopUpComponent } from './components/cs-pop-up/cs-pop-up.component';
import { CsPopUpDynamicHostDirective } from './directives/cs-pop-up-dynamic-host.directive';

@NgModule({
  declarations: [CsPopUpComponent, CsPopUpDynamicHostDirective],
  imports: [CommonModule],
  exports: [CsPopUpComponent],
})
export class CsPopUpModule {}
