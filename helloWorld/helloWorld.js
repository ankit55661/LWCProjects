import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    //logic of Application

    firstName; // {name} in template
    lastName;
    upperCaseName;
    handleChange(event){
        let whichName = event.target.name;
        if(whichName === 'firstName'){
            this.firstName=event.target.value;
        }
        else if(whichName === 'lastName'){
            this.lastName=event.target.value;
        }
    }


    // get upperCaseName(){
    //     let fullName= this.firstName + this.lastName;
       
    //     return fullName.toUpperCase();
    // }

    handleClickUpperCase(event){
        let fullName= this.firstName + this.lastName;
        this.upperCaseName= fullName.toUpperCase();
    }
    showName=false;
    checkboxChangeHandler(event){
        this.showName=event.target.checked;
    }

    get capitalName(){
         return `this.firstName + this.lastName.toUpperCase()`;
    }

}