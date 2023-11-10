import { ComponentRef, EventEmitter } from '@angular/core';
import { CsPopUpComponent } from '../components/cs-pop-up/cs-pop-up.component';

export interface CsPopUpConfig {
  component?: any;
  templateRef?: any;
  componentProps?: any;
  styles?: any;
  containerStyles?: any;
  id?: string;
  event?: MouseEvent;
}

export interface CsPopUpInternalConfig<T> extends CsPopUpConfig {
  animation?: string;
  showingPopUp?: boolean;
  componentRef: ComponentRef<T>;
  popUpClosed: () => Promise<any>;
  closed: EventEmitter<any>;
}
