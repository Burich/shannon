import { Component, OnInit } from '@angular/core';

class Answer {
  constructor(
    public userValue: 0 | 1,
    public botValue: 0 | 1 | 2
  ) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  shennon: any[];

  answer: 0 | 1 | 2 = 2;

  lastAnswers: Answer[];
  lastResult: 'Right' | 'Wrong';

  totalAnswers = 0;
  totalRight = 0;

  log: string[] = [];
  visualLog: string[] = [];

  init(counts: number[]): any {
    const result = [];

    if (counts.length) {
      const count = counts[0];
      for (let i = 0; i < count; ++i) {
        result.push(this.init(counts.slice(1)));
      }
      return result;
    } else {
      return 0;
    }
  }

  ngOnInit() {
    this.shennon = this.init([2, 3, 2, 3, 2]);
    this.lastAnswers = [new Answer(1, 2), new Answer(0, 2), new Answer(1, 2)];
  }

  say(n: 0 | 1) {
    const isRight = n === this.answer;
    this.lastResult = isRight ? 'Right' : 'Wrong';
    this.totalAnswers++;
    if (isRight) {
      this.totalRight++;
    }

    this.log.push(`User: ${n}, Bot: ${this.answer}, Result: ${this.lastResult}`);
    if (this.log.length > 20) {
      this.log = this.log.splice(1);
    }
    this.visualLog = this.log.reverse();

    this.updateTable(n);
    this.addAnswer(n);
    this.answer = this.calcNext();

  }

  updateTable(n: 0 | 1) {
    this.shennon
      [this.lastAnswers[0].userValue]
      [this.lastAnswers[0].botValue]
      [this.lastAnswers[1].userValue]
      [this.lastAnswers[1].botValue]
      [this.lastAnswers[2].userValue] += 1;
  }

  addAnswer(n: 0 | 1) {
    this.lastAnswers = this.lastAnswers.splice(1);
    this.lastAnswers.push(new Answer(n, this.answer));
  }

  calcNext(): 0 | 1 | 2 {
    const compare = this.shennon
      [this.lastAnswers[1].userValue]
      [this.lastAnswers[1].botValue]
      [this.lastAnswers[2].userValue]
      [this.lastAnswers[2].botValue];

    const zero = compare[0];
    const one = compare[1];

    if (zero === one) {
      return 2;
    } else if (zero > one) {
      return 0;
    } else {
      return 1;
    }
  }
}
