import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-otpmodal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './otpmodal.component.html',
  styleUrl: './otpmodal.component.css'
})
export class OtpmodalComponent {
  form: FormGroup;
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

  constructor() {
    this.form = this.toFormGroup(this.formInput);
  }

  toFormGroup(elements: any[]) {
    const group: any = {};

    elements.forEach((key: string | number) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  keyUpEvent(event: { keyCode: number; which: number; }, index: number) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1 ;
    } else {
      pos = index + 1 ;
    }
    if (pos > -1 && pos < this.formInput.length ) {
      this.rows._results[pos].nativeElement.focus();
    }

  }

  startTimer() {
    const totalSeconds = this.minutes * 60 + this.seconds;

    this.timerSubscription = interval(1000).subscribe((elapsedSeconds) => {
      const remainingTime = totalSeconds - elapsedSeconds;

      this.minutes = Math.floor(remainingTime / 60);
      this.seconds = remainingTime % 60;

      if (remainingTime <= 0) {
        this.timerSubscription.unsubscribe(); // Stop the timer when time runs out
      }
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
  }

