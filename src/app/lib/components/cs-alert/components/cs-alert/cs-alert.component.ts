import { Component } from '@angular/core';
import { CsAlertController } from '../../services/cs-alert-controller.service';

@Component({
  selector: 'cs-alert',
  templateUrl: './cs-alert.component.html',
  styleUrls: ['./cs-alert.component.scss'],
})
export class CsAlertComponent {
  constructor(public alertController: CsAlertController) {}
}

export interface AlertInfo {
  title?: string;
  msg?: string;
  msgList?: CustomMessage;
  showIcon?: boolean;
  iconName?: string;
  color?: 'primary' | 'danger' | 'success' | 'white';
  buttons?: ButtonAlert[];
}

export interface ButtonAlert {
  buttonText: string;
  buttonHandler: any;
  buttonColor: 'primary' | 'danger' | 'success' | 'white' | 'dark';
  buttonIcon?: string;
}

export interface CustomMessage {
  msg: string;
  icon: string;
  iconSlot: string;
}
