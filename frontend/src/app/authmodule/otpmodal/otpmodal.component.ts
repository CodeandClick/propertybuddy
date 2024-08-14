import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  Input,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-otpmodal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './otpmodal.component.html',
  styleUrl: './otpmodal.component.css',
})
export class OtpmodalComponent {
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Output() otpSendEvent = new EventEmitter<number>();
  @Input() isValidOtp!: boolean;

  reSendOtp: boolean = false;
  email!: string;
  form: FormGroup;
  isSubmit: boolean = false;

  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;

  minutes: number = 2; // Set the initial minutes here
  seconds: number = 0; // Set the initial seconds here
  private timerSubscription!: Subscription;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Unsubscribe when the component is destroyed
    }
  }

  constructor(private authService: AuthService) {
    this.form = this.toFormGroup(this.formInput);
  }

  toFormGroup(elements: any[]) {
    const group: any = {};

    elements.forEach((key: string | number) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  keyUpEvent(event: { keyCode: number; which: number }, index: number) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }
  }

  startTimer() {
    this.reSendOtp = false;
    const totalSeconds = this.minutes * 60 + this.seconds;

    this.timerSubscription = interval(1000).subscribe((elapsedSeconds) => {
      const remainingTime = totalSeconds - elapsedSeconds;

      this.minutes = Math.floor(remainingTime / 60);
      this.seconds = remainingTime % 60;

      if (remainingTime <= 0) {
        this.reSendOtp = true;
        this.timerSubscription.unsubscribe(); // Stop the timer when time runs out
      }
    });
  }

  sendOtp() {
    const email = localStorage.getItem('email');
    if (email) {
      this.authService.sendOtp(email);
      this.minutes = 2;
      this.seconds = 0;
      this.startTimer();
    } else {
      alert('session Expires');
    }
  }

  closeModal() {
    this.closeModalEvent.emit(false);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      const otp =
        this.form.value.input1 +
        this.form.value.input2 +
        this.form.value.input3 +
        this.form.value.input4 +
        this.form.value.input5 +
        this.form.value.input6;
      this.otpSendEvent.emit(otp);
    }
    this.isSubmit = true;
  }
}
