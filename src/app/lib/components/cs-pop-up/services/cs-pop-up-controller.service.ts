import { ComponentRef, EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  CsPopUpConfig,
  CsPopUpInternalConfig,
} from '../interfaces/cs-pop-up.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CsPopUpController {
  /**pop up instaces */
  popUps: CsPopUpInternalConfig<any>[] = [];
  /**pop up animation */
  animation = '';
  /**component create */
  componentCreated = new EventEmitter();
  /**global props */
  globalProps: any;

  /**
   * opens pop up
   * @param popUpConfiguration configuration to be used in component
   */
  openPopUp<T>(
    popUpConfiguration: CsPopUpConfig
  ): Promise<CsPopUpInternalConfig<T>> {
    return new Promise<CsPopUpInternalConfig<T>>((resolve) => {
      const config: any = { ...popUpConfiguration };
      const existingPopUp = this.popUps.find((popUp) => popUp.id === config.id);
      if (config.id && existingPopUp) {
        resolve(existingPopUp);
        return;
      }
      config.animation = 'popUpFadeIn';
      config.showingPopUp = true;
      this.popUps.push(config);
      const componentCreatedSub = this.componentCreated.subscribe(
        (componentRef) => {
          componentCreatedSub.unsubscribe();
          config.componentRef = componentRef;
          resolve(config);
        }
      );
    });
  }

  /**
   * close pop up and emits when that happens
   * @param data data returned from component injected
   * @returns promise
   */
  closePopUp(data?: any, id?: string) {
    return new Promise<void>((resolve) => {
      if (!this.popUps.length) {
        resolve();
      } else {
        let popUp!: CsPopUpInternalConfig<any>;
        let index = -1;
        if (id) {
          index = this.getPopUpIndexById(id);
          if (index > -1) {
            popUp = this.popUps[index];
          } else {
            popUp = this.currentPopup;
          }
        } else {
          popUp = this.currentPopup;
        }
        popUp.animation = 'popUpFadeOut';
        setTimeout(() => {
          popUp.closed.emit(data);
          if (index > -1) {
            this.popUps.splice(index, 1);
          } else {
            this.popUps.pop();
          }
          resolve();
        }, 300);
      }
    });
  }

  get currentPopup() {
    return this.popUps[this.popUps.length - 1];
  }

  getPopUpById<T>(id: string): CsPopUpInternalConfig<T> {
    return this.popUps[this.getPopUpIndexById(id)];
  }

  getPopUpIndexById(id: string) {
    return this.popUps.findIndex((popUp) => popUp.id === id);
  }
}
