import "./style.css";
import AppFetch from "./appFetch";
import keys from "./constants";
import converter from "./converter";

const root = document.documentElement;
const toggleTheme = document.querySelector("[data-toggle-theme]");
const form = document.querySelector("form");
const enterSearchAddress = document.querySelector(
  '[data-search-action="enterSearchAddress"]'
);
const btnSendAddress = document.querySelector(
  '[data-search-action="sendAddress"'
);
const dataLoadingAddressData = document.querySelector(
  '[data-loading-address-data="icon"]'
);
const errorMsg = document.querySelector("[data-error-message]");
const errorMsgSection = document.querySelector("[data-error-message-section]");
const tempConverted = document.querySelector('[data-temp="converted"]');
const tempUnitAbb = document.querySelector('[data-temp="unit"]');
const address = document.querySelector("[data-address]");
const tempUnitSection = document.querySelector("[data-temp-unit-section]");
const tempUnitFahrenheit = document.querySelector(
  '[data-temp-unit="fahrenheit"]'
);
const notAvailableImg = document.querySelector("[data-not-available-img]");

const temperature = document.querySelector('[data-weather-cast="temperature"]');
const humidity = document.querySelector('[data-weather-cast="humidity"]');
const windSpeed = document.querySelector('[data-weather-cast="wind_speed"]');
const cloudCover = document.querySelector('[data-weather-cast="cloud_cover"]');
const conditionDescription = document.querySelector(
  '[data-temp="description"]'
);
const condition = document.querySelector('[data-temp="condition"]');
const conditionIcon = document.createElement("img");
conditionIcon.classList.add("conditionIcon");
address.after(conditionIcon);

function togglePageTheme() {
  root.classList.toggle("dark");
}

const stopLoadingAddressData = () => {
  dataLoadingAddressData.classList.add("hide");
};

const capitalize = (text) =>
  text
    .split(" ")
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");

function ConvertHandler() {
  let prevTempUnit = null;

  function convert(e) {
    const tempUnit = e.target.dataset.tempUnit;

    if (!tempUnit) return;

    converter.set(tempUnit);
    const tempUnitValue = tempConverted.getAttribute("data-temp-value");
    tempConverted.textContent = converter.temp(tempUnitValue);
    tempUnitAbb.textContent = converter.first();
    switchActive(e.target);
  }

  const switchActive = (target) => {
    if (prevTempUnit) prevTempUnit.classList.remove("active");
    target.classList.add("active");
    prevTempUnit = target;
  };

  return { convert };
}

const convertHandler = ConvertHandler();

function ConditionIcon(img) {
  const availableIcon = [
    "rain",
    "snow",
    "cloudy",
    "wind",
    "clear-night",
    "clear-day",
    "partly-cloudy-day"
  ];

  const set = async (icon) => {
    notAvailableImg.classList.add("hide");
    const iconName = availableIcon.includes(icon) ? icon : availableIcon[0];
    const iconObj = await import(`./icons/${iconName}.svg`);
    img.src = iconObj.default;
  };

  return { set };
}

const conIcon = ConditionIcon(conditionIcon);

function updateDOM(AddressData) {
  address.textContent = capitalize(AddressData.address);
  const todayObj = AddressData.days[0];
  tempConverted.setAttribute("data-temp-value", `${todayObj.temp}`);
  temperature.textContent = todayObj.temp;
  humidity.textContent = todayObj.humidity;
  windSpeed.textContent = todayObj.windspeed;
  cloudCover.textContent = todayObj.cloudcover;
  conditionDescription.textContent = todayObj.description;
  condition.textContent = todayObj.conditions;
  if (!converter.get()) tempUnitFahrenheit.click();
  conIcon.set(todayObj.icon);

  form.reset();
  stopLoadingAddressData();
}

AppFetch.setElem(errorMsg, errorMsgSection);

const weatherFetch = new AppFetch(keys.weatherURL);

const SearchAction = {
  sendAddress: async () => {
    try {
      dataLoadingAddressData.classList.remove("hide");
      const AddressData = await weatherFetch.loadJSON(enterSearchAddress.value);
      updateDOM(AddressData);
      weatherFetch.hide();
    } catch (err) {
      stopLoadingAddressData();
      weatherFetch.msg("Error fetching address data");
      weatherFetch.display();
    }
  }
};

function handleSearchAction(e) {
  e.preventDefault();
  const searchAction = e.submitter.dataset.searchAction;
  if (typeof SearchAction[searchAction] !== "function") return;
  SearchAction[searchAction]();
}

toggleTheme.addEventListener("click", togglePageTheme);
tempUnitSection.addEventListener("click", convertHandler.convert);
form.addEventListener("submit", handleSearchAction);

(function init() {
  enterSearchAddress.value = "lagos";
  form.requestSubmit(btnSendAddress);
})();
