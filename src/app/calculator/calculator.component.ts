import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  firstNumber: number;
  secondNumber: number;
  operator: string;
  calculatedResult: number = 0;

  operatorOk: boolean = false;

  buttonDisabled = true;;

  // verify number1 and number2 to be in correct format
  verify(e) {
    let out = parseInt(e.target.value);

    //if the text entered is not a number, set the text to empty
    if (isNaN(out)) {
      (e.target.id == "firstNumber") ? (this.firstNumber = null) : (this.secondNumber = null);
    }
    else {
      (e.target.id == "firstNumber") ? (this.firstNumber = out) : (this.secondNumber = out);
    }


    if (this.firstNumber && this.secondNumber && this.operatorOk && (e.target.value != null)) {
      this.buttonDisabled = false;
    }
    else {
      this.buttonDisabled = true;
    }

    console.log(this.firstNumber);
  }
  verifyOperator(e) {
    let allowedOperators = ['+', '-', '/', '*', '^'];
    if (!(allowedOperators.indexOf(e.target.value) > -1)) {
      e.target.value = "";
      this.operatorOk = false;
    }
    else {
      this.operatorOk = true;
    }
    if (this.firstNumber && this.secondNumber && this.operatorOk && (e.target.value != null)) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }

  calculate() {
    switch (this.operator) {
      case '+':
        this.calculatedResult = this.firstNumber + this.secondNumber;
        break;
      case '-':
        this.calculatedResult = this.firstNumber - this.secondNumber;
        break;
      case '/':
        this.calculatedResult = this.firstNumber / this.secondNumber;
        break;
      case '*': this.calculatedResult = this.firstNumber * this.secondNumber;
        break;
      case '^': this.calculatedResult = Math.pow(this.firstNumber, this.secondNumber);
        break;
        case '@' : this.calculatedResult = Math.sqrt(this.firstNumber)
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
