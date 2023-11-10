import { Component } from '@angular/core';
import { AlertController } from './shared/components/alert/services/alert-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'RamseyStudentsClient';

  constructor(public alertController: AlertController) {}
}
