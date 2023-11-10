import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputErrorMessage',
})
export class InputErrorMessagePipe implements PipeTransform {
  transform(errorMessage: string, controlErrors: any): unknown {
    return this.renderErrorMessage(errorMessage, controlErrors);
  }

  renderErrorMessage(errorMessage: string, controlErrors: any) {
    const errorMessages: any = {
      required: 'Is required',
      email: 'Invalid email',
      minlength: `Must have ${controlErrors['minlength']?.requiredLength} min characters`,
      maxlength: `Must have ${controlErrors['maxlength']?.requiredLength} max characters`,
      pattern: 'Invalid format',
    };
    return errorMessages[errorMessage]
      ? errorMessages[errorMessage]
      : 'Message not set.';
  }
}
