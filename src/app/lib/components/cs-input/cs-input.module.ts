import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsInputComponent } from './components/cs-input/cs-input.component';
import { InputErrorMessagePipe } from './pipes/input-error-message.pipe';

@NgModule({
  declarations: [CsInputComponent, InputErrorMessagePipe],
  imports: [CommonModule],
  exports: [CsInputComponent],
})
export class CsInputModule {}
