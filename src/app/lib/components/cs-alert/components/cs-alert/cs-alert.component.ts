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
