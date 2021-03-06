import { Component } from '@angular/core';
import { Calculator2Component } from './calculator2/calculator2.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  // pass the operators that are allowed to the child component
  allowedOperators = ['+', '-', '/', '*', '^', '@'];


  calculations = [];

  addCalculation(e) {
    this.calculations.push(e);
  }

}
