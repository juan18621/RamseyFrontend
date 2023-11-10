import { Component } from '@angular/core';
import { CsAlertController } from './lib/components/cs-alert/services/cs-alert-controller.service';
import { CsPopUpController } from './lib/components/cs-pop-up/services/cs-pop-up-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'RamseyStudentsClient';

  constructor(
    public alertController: CsAlertController,
    public popUpController: CsPopUpController
  ) {}
}
