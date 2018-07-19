const URL = "https://judgetests.firebaseio.com/businfo/";

const BUS_STOP_ID = $("#stopId");
const BUS_STOP_NAME = $("#stopName");
const BUSES = $("#buses");

function getInfo() {
  let busId = BUS_STOP_ID.val();

  $.ajax({
      method: "GET",
      url: `${URL}${busId}.json`
    })
    .then(handleSucces)
    .catch(handleError);

  function handleSucces(res) {
    BUSES.empty();
    BUS_STOP_NAME.empty();
    BUS_STOP_NAME.text(res.name);

    let allBuses = res.buses;
    for (var variable in allBuses) {
      if (allBuses.hasOwnProperty(variable)) {
        let newLi = $(`<li>Bus ${variable} arrives in ${allBuses[variable]} minutes</li>`);
        BUSES.append(newLi);
      }
    }
  }

  function handleError(err) {
    BUSES.empty();
    BUS_STOP_NAME.empty();

    BUS_STOP_NAME.text("Error");
  }
}