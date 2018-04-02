function attachEvents() {
  const URL_LOCATIONS = 'https://judgetests.firebaseio.com/locations.json';
  const URL_TODAY_FORECAST = 'https://judgetests.firebaseio.com/forecast/today/';
  const URL_UPCOMING_FORECAST = 'https://judgetests.firebaseio.com/forecast/upcoming/';

  const $LOCATION = $('#location');
  const $SUBMIT_BTN = $('#submit');
  const $FORECAST_DIV = $('#forecast');
  const $CURRENT_FORECAST = $('#current');
  const $UPCOMING_FORECAST = $('#upcoming');

  const FORECAST_SYMBOLS = {
    'Sunny': '&#x2600;',
    'Partly sunny': '&#x26C5;',
    'Overcast': '&#x2601;',
    'Rain': '&#x2614;',
    'Degrees': '&#x2103;'
  }

  $SUBMIT_BTN.on('click', getForecast);

  function request(method, url) {
    let obj = {
      method: method,
      url: url
    };

    return $.ajax(obj);
  }

  function getForecast() {
    request('GET', URL_LOCATIONS)
      .then(getLocationCode)
      .catch(handleError);
  }

  function getLocationCode(locations) {
    let locationName = $LOCATION.val();

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

    renderTodayForecast(today);
    renderUpcomingForecast(upcoming);

    $FORECAST_DIV.attr('style', 'display:block');
  }

  function renderTodayForecast(today) {
    $CURRENT_FORECAST.find('span').remove();

    $CURRENT_FORECAST
      .append($('<span class="condition symbol">').append(FORECAST_SYMBOLS[today.forecast.condition]))
      .append($('<span class="condition">')
        .append($('<span class="forecast-data">').append(today.name))
        .append($('<span class="forecast-data">').append(`${today.forecast.low}${FORECAST_SYMBOLS.Degrees}/${today.forecast.high}${FORECAST_SYMBOLS.Degrees}`))
        .append($('<span class="forecast-data">').append(today.forecast.condition)));
  }

  function renderUpcomingForecast(upcoming) {
    $UPCOMING_FORECAST.find('span').remove();

    for (let currentDayForecast of upcoming.forecast) {
      $UPCOMING_FORECAST
        .append($('<span class="upcomig">')
          .append($('<span class="symbol">').append(FORECAST_SYMBOLS[currentDayForecast.condition]))
          .append($('<span class="forecast-data">').append(`${currentDayForecast.low}${FORECAST_SYMBOLS.Degrees}/${currentDayForecast.high}${FORECAST_SYMBOLS.Degrees}`))
          .append($('<span class="forecast-data">').append(currentDayForecast.condition)));
    }
  }

  function handleError(error) {
    $FORECAST_DIV.html("Error");
    $FORECAST_DIV.css("display", "block");
  }
}