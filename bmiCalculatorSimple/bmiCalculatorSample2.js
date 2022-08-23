import { LightningElement } from 'lwc';

export default class BmiCalculatorSample2 extends LightningElement {
 
    bmiResult=0;
    name;
    weight;
    height;


    nameChangeHandler(event){
        this.name=event.target.value;
    }

    heightChangeHandler(event){
        this.height=parseFloat(event.target.value);
        console.log('Height '+this.height);
    }
    weightChangeHandler(event){
        this.weight = parseInt(event.target.value);

        
    }

    changeHandler(event){
        if(event.target.name == 'userName'){
            this.name= event.target.value;
        }
        else if(event.target.name =='height'){
            this.height= event.target.value;

        }
        else if(event.target.name == 'weight'){
            this.weight= event.target.value;

        }
    }
    toShow=false;
    calculateBMI(){
        this.toShow=true;
        let height = this.height*this.height;
        console.log('height '+this.height+' weight '+this.weight);
        console.log(this.weight/(this.height*this.height));

        this.bmiResult = Math.round(this.weight/(this.height*this.height));
  
    }
    reset(){
        this.handleSelect();
    }
    handleSelect(){
        //  this.template.querySelector('lightning-input').value=null;
        this.weight= null;
        this.height = null;
        this.name = null;
    }
    

}
