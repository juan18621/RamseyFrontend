import { Component } from '@angular/core';
import { CsAlertController } from '../../services/cs-alert-controller.service';

@Component({
  selector: 'cs-alert-loading',
  templateUrl: './cs-alert-loading.component.html',
  styleUrls: ['./cs-alert-loading.component.scss'],
})
export class CsAlertLoadingComponent {
  constructor(public alertController: CsAlertController) {}
}

export interface CustomMessage {
  msg: string;
  icon: string;
  iconSlot: 'start' | 'end';
  iconColor: string;
}
