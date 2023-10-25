import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  prevOp: any = '';
  correntOp: any = '';
  firstOp = true;
  
  addInDisplay(value:any){
    if(this.firstOp){
      if(+value >= 0 || value === "."){
        this.addDigit(value)
      }else{
        this.processOp(value)
      }
    }
    else{
      this.prevOp = "";
      this.correntOp = "";
      this.firstOp = true;
    }
  }
  addDigit(digit:any){
    if(digit === "." && this.correntOp.includes(".")){
      return
    }
    this.correntOp += digit;
  }
  processOp(op:any){
    let valueOp:any;
    let prev = +this.prevOp.split(" ")[0];
    let actual = +this.correntOp;

    switch(op){
      case"+":
      valueOp = prev + actual;
      this.attVisor(valueOp, op, actual, prev)
      break
      case"-":
      valueOp = prev - actual;
      this.attVisor(valueOp, op, actual, prev)
      break
      case"*":
      valueOp = prev * actual;
      this.attVisor(valueOp, op, actual, prev)
      break
      case"/":
      valueOp = prev / actual;
      this.attVisor(valueOp, op, actual, prev)
      break
      case"C":
      this.processOpC()
      break
      case"=":
      this.processOpEqual()
      break
    }
  }
  attVisor(
    valueOp = null,
    op = null,
    actual:any,
    prev:any
  ){
    if(valueOp !== null){
      if(prev === 0){
        valueOp = actual;
      }
      this.prevOp = `${actual} ${op}`
      if(prev > 0){
        this.prevOp = `${prev} ${op} ${actual} =`
        this.correntOp = valueOp;
      }else{
        this.correntOp = "";
      }
    }
    
  }
  processOpC(){
    this.correntOp = "";
    this.prevOp = "";
  }
  processOpEqual(){
    let op = this.prevOp.split(" ")[1];
    this.firstOp = false;
    this.processOp(op);
  }

}
