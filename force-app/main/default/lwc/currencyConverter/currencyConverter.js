import { LightningElement } from 'lwc';
import { countryCodes } from 'c/countryCodeList';

export default class CurrencyConverter extends LightningElement {
    countryList = countryCodes;
    currencyFrom = "USD";
    currencyTo = "INR";
    amount='';
    result
    error
    handleChange(event) {
        const { name, value } = event.target;
        console.log('name',name);
        console.log(value);
        this[name]=value; //whenevr option selected changed, update currencyFrom/to with new value
        this.result='';
    this.error='';
    }
submitHandler(event){
event.preventDefault();
this.convert();

}
     async convert(){
    // const API_URL = `https://api.exchangerate.host/convert?access_key=${AUTH_KEY}&from=${this.countryFrom}&to=${this.countryTo}`
    const API_KEY = 'ec143407058bf02049a45b2d'
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.currencyFrom}/${this.currencyTo}`
    try{
      const data = await fetch(API_URL)
      const jsonData = await data.json();
       console.log('jsonData ',jsonData.conversion_rate);
      // this.result = (Number(this.amount) * jsonData.result).toFixed(2)
      this.result = (Number(this.amount) * jsonData.conversion_rate).toFixed(2)
      console.log('result',this.result);
      console.log(this.result)
    } catch(error){
      console.log(error)
      this.error="An error occurred. Please try again..."
    }
  }
}
