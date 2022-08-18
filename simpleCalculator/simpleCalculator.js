import { LightningElement } from 'lwc';

export default class SimpleCalculator extends LightningElement {
  num1;
  num2;
  //operation;
  res;

 handleChange(event){
    if(event.target.name=="firstNum"){
        console.log('this.num1 '+this.num1);
      this.num1 = event.target.value;      
    } else if (event.target.name=="secondNum"){
        console.log('this.num1 '+this.num1);
      this.num2 = event.target.value;
    }
  }
   
  calculateOperation(event){
    if(event.target.name=="sum"){
      console.log(event.target.name);
      this.res=parseInt(this.num1) + parseInt(this.num2);
      console.log('this.result '+this.res);

      
    } else if (event.target.name=="sub"){
      console.log(event.target.name);
      this.res=parseInt(this.num1) - parseInt(this.res);
    }
  }

}