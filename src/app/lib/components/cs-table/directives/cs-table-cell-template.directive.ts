import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({ selector: '[csCellTemplate]' })
export class CsCellTemplateDirective {
  /**cell template name to identify template */
  @Input('csCellTemplate') templateName!: string;
  /**
   *
   * @param template template ref to be painted
   */
  constructor(public readonly template: TemplateRef<any>) {}
}
