const URL = 'https://judgetests.firebaseio.com/schedule';

const INFO_SPAN = $('#info').find('.info');
const DEPART_BTN = $('#depart');
const ARRIVE_BTN = $('#arrive');


function solve() {
  let lastStop = 'Depot';
  let nextStop = 'depot';

  function depart() {
    $.ajax({
        method: 'GET',
        url: URL + '/' + nextStop + '.json'
      })
      .then(handleSuccess)
      .catch(handleError);

    function handleSuccess(res) {
      DEPART_BTN.attr('disabled', true);
      ARRIVE_BTN.attr('disabled', false);

      INFO_SPAN.empty();
      INFO_SPAN.text(`Next stop ${nextStop}`);

      nextStop = res.next;
    }

    function handleError(err) {
      console.error("BOOM");
    }
  }

  function arrive() {
    DEPART_BTN.attr('disabled', false);
    ARRIVE_BTN.attr('disabled', true);

    INFO_SPAN.empty();
    INFO_SPAN.text(`Arrived at ${lastStop}`);
  }

  return {
    depart,
    arrive
  };
}

let result = solve();