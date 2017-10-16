import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator2.component.html',
  styleUrls: ['./calculator2.component.css']
})


export class Calculator2Component {

  firstNumber: FormControl = new FormControl();
  secondNumber: FormControl = new FormControl();

  firstNumberValue: number = null;
  secondNumberValue: number = null;

  @Input('allowedoperators') allowedoperators: string[];


  constructor() {
    this.firstNumber.valueChanges.debounceTime(500).subscribe(value => this.verify(value, 1));
    this.secondNumber.valueChanges.debounceTime(500).subscribe(value => this.verify(value, 2));
  }


  operator: string;
  calculatedResult: number = 0;

  operatorOk: boolean = false;
  buttonDisabled = true;;

  // verify number1 and number2 to be in correct format
  verify(value, field) {

    let out = parseFloat(value);

    //if the text entered is not a number, set the text to empty
    if (isNaN(out)) {

      (field == 1) ? (this.firstNumberValue = null) : (this.secondNumberValue = null);
    }
    else {
      (field == 1) ? (this.firstNumberValue = out) : (this.secondNumberValue = out);
    }


    if (this.firstNumberValue != null && this.secondNumberValue != null && this.operatorOk) {
      this.buttonDisabled = false;
    }
    else {
      this.buttonDisabled = true;
    }
  }

  verifyOperator(e) {
    let allowedOperators = this.allowedoperators;
    if (!(allowedOperators.indexOf(e.target.value) > -1)) {
      e.target.value = "";
      this.operatorOk = false;
    }
    else {
      this.operatorOk = true;
    }
    if (this.firstNumberValue != null && (e.target.value == '@')) {
      this.buttonDisabled = false;
    }
    else if (this.firstNumberValue != null && this.secondNumberValue != null && this.operatorOk) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }

  calculate() {
    switch (this.operator) {
      case '+':
        this.calculatedResult = this.firstNumberValue + this.secondNumberValue;
        break;
      case '-':
        this.calculatedResult = this.firstNumberValue - this.secondNumberValue;
        break;
      case '/':
        this.calculatedResult = Math.round((this.firstNumberValue / this.secondNumberValue) * 100) / 100;
        break;
      case '*': this.calculatedResult = this.firstNumberValue * this.secondNumberValue;
        break;
      case '^': this.calculatedResult = Math.pow(this.firstNumberValue, this.secondNumberValue);
        break;
      case '@': this.calculatedResult = Math.round(Math.sqrt(this.firstNumberValue) * 100) / 100;
    }
  }



}
