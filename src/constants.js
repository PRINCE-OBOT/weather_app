const keys = {
  // Weather API
  weatherURL(queryParameter) {
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${queryParameter}?unitGroup=us&key=MQSZG96YQ3JGECWBH9SMD2RYU&contentType=json`;
  },

  fahrenheit: 'fahrenheit'
};

export default keys
