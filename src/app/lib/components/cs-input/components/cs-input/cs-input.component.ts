import {
  Component,
  Input,
  forwardRef,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Optional,
  Host,
  SkipSelf,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ControlContainer,
  FormControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CsInputType } from '../../types/cs-input-types.type';
import { CsInputFormatService } from '../../services/cs-input-format.service';

@Component({
  selector: 'cs-input',
  templateUrl: './cs-input.component.html',
  styleUrls: ['./cs-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CsInputComponent),
    },
  ],
})
export class CsInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @ViewChild('input') inputElement!: ElementRef<HTMLInputElement>;

  @Input() label = '';

  @Input() labelStyle: '' | 'floating' | 'fixed' = '';

  @Input() inputStyle: '' | 'material' | 'material-outline' = '';

  @Input() value = '';

  @Input() placeholder = '';

  @Input() disable = false;

  @Input() readonly = false;

  @Input() formControlName = '';

  @Input() formControl?: FormControl;

  @Input() customMessages: any = {};

  @Input() type: CsInputType = 'text';

  @Input() countryCode = '';

  @Input() currencyCode = '';

  @Input() decimalSpots = 2;

  //store errors from form control
  controlErrors: any = {};
  //store errors name
  errors: string[] = [];

  valueChangesSub = new Subscription();

  statusChangesSub = new Subscription();

  caretPosition = 0;

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
    private csInputFormatService: CsInputFormatService
  ) {}

  ngOnInit(): void {
    this.configureErrorListener();
  }

  configureErrorListener() {
    if (!this.inputControl) {
      return;
    }
    this.valueChangesSub = this.inputControl?.valueChanges.subscribe(() => {
      // set errors
      this.setControlErrors();
    });
    this.statusChangesSub = this.inputControl?.statusChanges.subscribe(() => {
      // set errors
      this.setControlErrors();
    });
  }

  setControlErrors() {
    this.controlErrors = this.inputControl?.errors as any;
    this.errors = !this.controlErrors
      ? []
      : Object.keys(this.controlErrors).map((key) => key);
  }

  get inputControl() {
    if (this.formControl) {
      return this.formControl;
    }
    if (this.controlContainer) {
      return this.controlContainer.control?.get(this.formControlName);
    }
    return null;
  }

  get invalid() {
    return (
      this.errors.length &&
      this.inputControl?.invalid &&
      this.inputControl?.touched
    );
  }

  get valid() {
    return (
      !this.errors.length &&
      this.inputControl?.valid &&
      this.inputControl?.touched
    );
  }

  onChange = (value: string) => {};
  onTouch = () => {};

  writeValue(value?: string | number): void {
    this.value = value?.toString() || '';
    this.verifyFormat();
  }

  /**
   * verifies format when value is written
   */
  verifyFormat() {
    if (this.type === 'currency') {
      this.value = this.applyFormat({ value: this.value } as HTMLInputElement); // simulate target
      //wait to render real input
      setTimeout(() => {
        this.inputElement.nativeElement.value = this.value;
        this.onChange(this.value);
      }, 0);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled;
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    //format input
    this.applyFormat(input);

    this.value = input.value;

    this.onChange(this.value);
    this.onTouch();
  }

  onKeyDown(event: any) {
    this.caretPosition = event.target.selectionStart;
  }

  applyFormat(input: HTMLInputElement) {
    switch (this.type) {
      case 'title':
        this.csInputFormatService.titleCaseFormat(input);
        break;
      case 'phone':
        this.csInputFormatService.phoneFormat(input, this.countryCode);
        break;
      case 'currency':
        this.csInputFormatService.currencyFormat(
          input,
          this.currencyCode,
          this.decimalSpots
        );

        const lengthDifference = input.value.length - this.value.length;

        this.inputElement.nativeElement.setSelectionRange(
          this.caretPosition + lengthDifference,
          this.caretPosition + lengthDifference
        );
        break;
      default:
        break;
    }

    return input.value;
  }

  ngOnDestroy(): void {
    this.valueChangesSub.unsubscribe();
    this.statusChangesSub.unsubscribe();
  }
}
