
import keys from './constants'

class Converter {
  constructor() {
    this.tempUnit = keys.fahrenheit;
  }

  set(tempUnit) {
    this.tempUnit = tempUnit;
  }
  
  get() {
    return this.tempUnit;
  }

  round(value) {
    return Math.round(value * 100) / 100;
  }

  first() {
    return this.tempUnit[0].toUpperCase();
  }

  fahrenheit(value) {
    return value;
  }

  celsius(value) {
    return this.round((value - 32) * (5 / 9));
  }


  temp(value) {
    return value === "N/A" ? value : this[this.tempUnit](+value);
  }
}


export default Converter;
