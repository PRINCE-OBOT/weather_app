const keys = {
  // Weather API
  weatherURL(queryParameter) {
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${queryParameter}?unitGroup=us&key=MQSZG96YQ3JGECWBH9SMD2RYU&contentType=json`;
  },

  // WEATHER CONDITION
  sunny: "SUNNY",
  partlyCloudy: "PARTLY_CLOUDY"
};

export default keys
