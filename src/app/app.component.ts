import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tower-of-hanoi-app';
  public createBlockCount: number = 3;
  public moveCount: number = 0;
  public blockCountError: boolean = false;
  public minBlockCountError: boolean = false;
  public maxBlockCountError: boolean = false;
  public toggleClicks: boolean = false;
  public firstContainerArr: Array<any> = [];
  public secondContainerArr: Array<any> = [];
  public thirdContainerArr: Array<any> = [];
  public tempContainerArr: Array<any> = [];
  public isCompletedAlert: boolean = false;
  public isFirstTempArr: boolean = false;
  public isSecondTempArr: boolean = false;
  public isThirdTempArr: boolean = false;
  public color: any;

  public atBest: number = 0;
  constructor() {}
  ngOnInit(): void {
    this.blockCreation();
    this.isCompleted();
  }

  public addCreateBlock = () => {
    this.createBlockCount = this.createBlockCount + 1;
    this.createBlock();
  };

  public subCreateBlock = () => {
    this.createBlockCount = this.createBlockCount - 1;
    this.createBlock();
  };

  public createBlock = () => {
    this.restart();
    console.log(this.createBlockCount);
    if (this.createBlockCount < 3 || this.createBlockCount > 7) {
      this.blockCountError = true;
      if (this.createBlockCount < 3) {
        this.minBlockCountError = true;
        this.maxBlockCountError = false;
      }
      if (this.createBlockCount > 7) {
        this.minBlockCountError = false;
        this.maxBlockCountError = true;
      }
    } else {
      this.blockCountError = false;
      this.minBlockCountError = false;
      this.maxBlockCountError = false;
      this.blockCreation();
    }
  };

  public blockCreation = () => {
    this.firstContainerArr = new Array();
    for (var x = 0; x < this.createBlockCount; x++) {
      this.setBg();
      this.firstContainerArr.push({
        blockValue: x + 1,
        blockWidth: (x + 1) * 14,
        blockColor: this.color,
      });
    }
    console.log(this.firstContainerArr);
    return this.firstContainerArr;
  };

  public setBg = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    this.color = "#" + randomColor;
    return this.color;
  };

  public toggleClickHandle = () => {
    this.toggleClicks = !this.toggleClicks;
    console.log(this.toggleClicks);
    if (!this.toggleClicks) {
      this.moveCount = this.moveCount + 1;
    }
  };

  public firstContainerClick = () => {
    if (!this.toggleClicks) {
      if (this.firstContainerArr.length > 0) {
        console.log("pick from 1");
        let temp = this.firstContainerArr.shift();
        this.tempContainerArr.push(temp);
        console.log(this.tempContainerArr);
        this.isFirstTempArr = true;
        this.isSecondTempArr = false;
        this.isThirdTempArr = false;
        this.toggleClickHandle();
      } else {
        console.log("no more element to pick from this container");
        this.tempContainerArr = [];
        this.toggleClicks = false;
      }
    } else {
      console.log("drop to 1");
      if (this.tempContainerArr && this.firstContainerArr.length == 0) {
        this.firstContainerArr.unshift(this.tempContainerArr[0]);
        this.tempContainerArr = [];
        this.toggleClickHandle();
      } else {
        if (
          this.firstContainerArr[0].blockValue >
          this.tempContainerArr[0].blockValue
        ) {
          this.firstContainerArr.unshift(this.tempContainerArr[0]);
          this.tempContainerArr = [];
          this.toggleClickHandle();
        } else {
          this.toggleClicks = true;
        }
      }
    }
  };

  public secondContainerClick = () => {
    if (!this.toggleClicks) {
      if (this.secondContainerArr.length > 0) {
        console.log("pick from 2");
        let temp = this.secondContainerArr.shift();
        this.tempContainerArr.push(temp);
        console.log(this.tempContainerArr);
        this.isFirstTempArr = false;
        this.isSecondTempArr = true;
        this.isThirdTempArr = false;
        this.toggleClickHandle();
      } else {
        console.log("no more element to pick from this container");
        this.tempContainerArr = [];
        this.toggleClicks = false;
      }
    } else {
      console.log("drop to 2");
      if (this.tempContainerArr && this.secondContainerArr.length == 0) {
        this.secondContainerArr.unshift(this.tempContainerArr[0]);
        this.tempContainerArr = [];
        this.toggleClickHandle();
      } else {
        if (
          this.secondContainerArr[0].blockValue >
          this.tempContainerArr[0].blockValue
        ) {
          this.secondContainerArr.unshift(this.tempContainerArr[0]);
          this.tempContainerArr = [];
          this.toggleClickHandle();
        } else {
          this.toggleClicks = true;
        }
      }
    }
  };

  public thirdContainerClick = () => {
    if (!this.toggleClicks) {
      if (this.thirdContainerArr.length > 0) {
        console.log("pick from 1");
        let temp = this.thirdContainerArr.shift();
        this.tempContainerArr.push(temp);
        console.log(this.tempContainerArr);
        this.isFirstTempArr = false;
        this.isSecondTempArr = false;
        this.isThirdTempArr = true;
        this.toggleClickHandle();
      } else {
        console.log("no more element to pick from this container");
        this.tempContainerArr = [];
        this.toggleClicks = false;
      }
    } else {
      console.log("drop to 3");
      if (this.tempContainerArr && this.thirdContainerArr.length == 0) {
        this.thirdContainerArr.unshift(this.tempContainerArr[0]);
        this.tempContainerArr = [];
        this.toggleClickHandle();
        this.isCompleted();
      } else {
        if (
          this.thirdContainerArr[0].blockValue >
          this.tempContainerArr[0].blockValue
        ) {
          this.thirdContainerArr.unshift(this.tempContainerArr[0]);
          this.tempContainerArr = [];
          this.toggleClickHandle();
          this.isCompleted();
        } else {
          this.toggleClicks = true;
        }
      }
    }
  };

  public isCompleted = () => {
    if (this.createBlockCount === this.thirdContainerArr.length) {
      this.isCompletedAlert = true;
      this.atBest = Math.pow(2, this.createBlockCount) - 1;
    }
  };

  public restart() {
    this.moveCount = 0;
    this.blockCountError = false;
    this.minBlockCountError = false;
    this.maxBlockCountError = false;
    this.toggleClicks = false;
    this.firstContainerArr = [];
    this.secondContainerArr = [];
    this.thirdContainerArr = [];
    this.tempContainerArr = [];
    this.isCompletedAlert = false;
    this.isFirstTempArr = false;
    this.isSecondTempArr = false;
    this.isThirdTempArr = false;
    this.blockCreation();
  }
}
