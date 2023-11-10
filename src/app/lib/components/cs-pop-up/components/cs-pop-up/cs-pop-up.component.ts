import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CsPopUpDynamicHostDirective } from '../../directives/cs-pop-up-dynamic-host.directive';
import { CsPopUpController } from '../../services/cs-pop-up-controller.service';
import {
  CsPopUpConfig,
  CsPopUpInternalConfig,
} from '../../interfaces/cs-pop-up.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cs-pop-up',
  templateUrl: './cs-pop-up.component.html',
  styleUrls: ['./cs-pop-up.component.scss'],
})
export class CsPopUpComponent implements AfterViewInit, OnInit, OnDestroy {
  /**access host directive */
  @ViewChild(CsPopUpDynamicHostDirective)
  hostDirective!: CsPopUpDynamicHostDirective;

  @Input() wrapper = false;
  @Input() popUpConfiguration!: CsPopUpInternalConfig<any>;
  @Input() hidden = false;
  @Input() animation = 'popUpFadeIn';

  closedSubcription = new Subscription();

  /**
   *
   * @param popUpController service to manage the pop up
   * @param changeDetector change detector to avoid after view init errors
   */
  constructor(
    public popUpController: CsPopUpController,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.popUpConfiguration.popUpClosed = this.popUpClosed.bind(this);
    this.popUpConfiguration.closed = new EventEmitter();
  }

  get animationPopUp() {
    return this.wrapper ? this.animation : this.popUpConfiguration.animation;
  }

  /**
   * after view init
   */
  ngAfterViewInit(): void {
    if (!this.wrapper) {
      if (this.popUpConfiguration.component) {
        this.createComponent();
      } else if (this.popUpConfiguration.templateRef) {
        this.createTemplateRef();
      }
    }
  }

  /**
   * creates dynamic component
   */
  createComponent() {
    const componentRef = this.hostDirective.createComponent();
    if (this.popUpConfiguration.componentProps) {
      Object.keys(this.popUpConfiguration.componentProps).forEach((key) => {
        this.hostDirective.componentRef.instance[key] =
          this.popUpConfiguration.componentProps[key];
      });
    }
    this.popUpController.componentCreated.emit(componentRef);
    this.changeDetector.detectChanges();
  }
  /**
   * projects the template in pop up
   */
  createTemplateRef() {
    this.hostDirective.createView();
    this.changeDetector.detectChanges();
    this.popUpController.componentCreated.emit();
  }
  /**
   * on pop up closed returns data
   * @returns promise
   */
  popUpClosed() {
    return new Promise<any>((resolve) => {
      this.closedSubcription = this.popUpConfiguration.closed.subscribe(
        (data) => {
          resolve(data);
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.closedSubcription.unsubscribe();
  }
}
