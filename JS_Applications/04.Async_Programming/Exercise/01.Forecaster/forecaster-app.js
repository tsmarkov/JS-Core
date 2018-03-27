function attachEvents() {
  const URL_LOCATIONS = 'https://judgetests.firebaseio.com/locations.json';
  const URL_TODAY_FORECAST = 'https://judgetests.firebaseio.com/forecast/today/';
  const URL_UPCOMING_FORECAST = 'https://judgetests.firebaseio.com/forecast/upcoming/';

  const LOCATION = $('#location');
  const SUBMIT_BTN = $('#submit');
  const FORECAST_DIV = $('#forecast');
  const CURRENT_FORECAST = $('#current');
  const UPCOMING_FORECAST = $('#upcoming');

  SUBMIT_BTN.on('click', getForecast);

  function request(method, url) {
    let obj = {
      method: method,
      url: url
    };

    return $.ajax(obj);
  }

  function getForecast() {
    let locationName = LOCATION.val();

    request('GET', URL_LOCATIONS)
      .then(getLocationCode)
      .catch(handleError);
  }

  function getLocationCode(locations) {
    let location = locations.filter(l => l.name === locationName)[0];

    if (location === undefined) {
      handleError(new Error('Location does not exist'));
    }

    let locationCode = location.code;

    let todayForecast = request('GET', URL_TODAY_FORECAST + locationCode + '.json');
    let upcomingForecast = request('GET', URL_UPCOMING_FORECAST + locationCode + '.json');

    Promise.all([todayForecast, upcomingForecast])
      .then(renderForecast)
      .catch(handleError);
  }

  function renderForecast(forecasts) {
    let [today, upcoming] = forecasts;


  }

  function handleError(error) {
    //// TODO: Implement
  }
}