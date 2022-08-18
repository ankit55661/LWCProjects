import { LightningElement, track, wire } from 'lwc';
import { createRecord, getRecord } from 'lightning/uiRecordApi'; 
import BMI_WEIGHT from '@salesforce/schema/BMI_Calculator__c.Weight__c';
import BMI_HEIGHT from '@salesforce/schema/BMI_Calculator__c.Height__c';
import BMI_NAME from '@salesforce/schema/BMI_Calculator__c.Name';
import BMI_RESULT from '@salesforce/schema/BMI_Calculator__c.BMI_Result__c';
import BMI_MESSAGE from '@salesforce/schema/BMI_Calculator__c.BMI_Message__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

const fielsArray=[BMI_WEIGHT, BMI_HEIGHT, BMI_NAME, BMI_RESULT,BMI_MESSAGE];
export default class BmiCalculator extends LightningElement {

    name="";
    height=0;
    weight=0;
    bmi=0;
    message="";
    recordId;

    @wire(getRecord,{recordId:'$recordId', fields: fielsArray})
    bmiRecords;

    handleNameChange(event){
        this.name=event.target.value;
    }

    handleChange(event){
        if(event.target.name=="height"){
            this.height=event.target.value; 
        }
        else if(event.target.name=="weight"){
            this.weight=event.target.value;
        }
    }
    get message(){
        return this.message;
    }
    set message(value){
        this.message=value;
    }
    get result(){
        return this.bmi;
    }

    calculateBMI(){

        this.bmi=Math.round((this.weight)/(this.height**2)*703);
        console.log('BMI: '+this.bmi);

        if(this.bmi>25){
            this.message="You are overweight!";
            // alert('You are overweight!');
        }
        else if(this.bmi<18.5){
            this.message="You are underweight!";
            // alert('You are underweight!');
         
        }
        else if(this.bmi>=18.5 && this.bmi<=25){
            this.message="Ideal Weight";
            // alert('Ideal weight!');
         }
         console.log('BMI: '+this.message);

         const fields={
            'Name': this.name,
            'BMI_Result__c': this.bmi,
            'Height__c': this.height,
            'Weight__c': this.weight,
            'BMI_Message__c': this.message
        };

        const recInput={apiName: 'BMI_Calculator__c', fields};
        console.log('inside calculateBMI '+fields);
        
        createRecord(recInput).then(response =>{
            console.log('createRecord called');
            console.log('BMI Calculator Id '+response.id);
            this.recordId=response.id;
            // this.fetchDetails();
            this.showToast1();
            this.navigateToRecord();
            
        }).catch(error =>{
            console.log('createRecord called - error');
            console.log('Error creating the BMI record '+error);
        })
    }

    navigateToRecord(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'BMI_Calculator__c',
                actionName: 'view'
            }
        });
    }
    showToast1(){
        const evt = new ShowToastEvent({
            title: 'Success',
            message: 'Record Created! '+this.recordId,
            variant: 'success'
    });
   
    this.dispatchEvent(evt);
   
    }
    bmiName;
    bmiValue;
    bmiMessage;
    // fetchDetails(){
    //     this.bmiName=this.bmiRecords.data.fields.Name.value;
    //     this.bmiValue=this.bmiRecords.data.fields.BMI_Result__c.value;
    //     console.log('bmiMessage '+this.bmiRecords.data.fields.BMI_Result__c.value)
    //     this.bmiMessage=this.bmiRecords.data.fields.BMI_Message__c.value;
    // }


        get fetchName(){
        console.log('this.bmiRecords# '+this.bmiRecords);
        console.log('this.bmiRecords.data.fields.Name.value '+this.bmiRecords.data.fields.Name.value);
        console.log('data '+JSON.stringify(this.bmiRecords.data));
            if(this.bmiRecords.data){
                return this.bmiRecords.data.fields.Name.value;
            }
            else{
                return undefined;
            }
        }

        get fetchBMI(){
            if(this.bmiRecords.data){
                return this.bmiRecords.data.fields.BMI_Result__c.value;
            }
            else{
                return undefined;
            }
        }

        get fetchMessage(){
            if(this.bmiRecords.data){
                return this.bmiRecords.data.fields.BMI_Message__c.value;
            }
            else{
                return undefined;
            }
        }

}