import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  expensesList: any = [];

  constructor() {

  }

  ngOnInit () {

  }

  startStopTimer(expense: any, flag: any) {

  }

}
