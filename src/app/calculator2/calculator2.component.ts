import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator2.component.html',
  styleUrls: ['./calculator2.component.css']
})


export class Calculator2Component {

  // formcontrols to validate the inputs in the two number fields
  firstNumber: FormControl = new FormControl();
  secondNumber: FormControl = new FormControl();

  // two way binding to the two number fields to these variables
  // this would ensure automatic updation of the values
  firstNumberValue: number = null;
  secondNumberValue: number = null;

  // retrieve the passed allowed operators
  @Input('allowedoperators') allowedoperators: string[];

// if user does not type for 500ms, intiate a function to validate the fields for being a proper number
  constructor() {
    this.firstNumber.valueChanges.debounceTime(500).subscribe(value => this.verify(value, 1));
    this.secondNumber.valueChanges.debounceTime(500).subscribe(value => this.verify(value, 2));
  }

  //  two way binding to the operator field
  operator: string;
  operatorOk: boolean = false;
  
  // calculated result variable which displays the final result on the screen
  calculatedResult: number = 0;

  // variable to dynamically enable the submit button only when the conditions are met
  buttonDisabled = true;

  // this function verifies number1 and number2 to be in correct format
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

  // this function verifies the operator to be in among the allowed operators
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

  // this function performs the final calculations
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
