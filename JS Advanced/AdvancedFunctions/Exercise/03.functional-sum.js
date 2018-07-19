let add = (function() {
  let sum = 0;

  function increase(value) {
    sum += value;
    return increase;
  }

  increase.toString = function() {
    return sum;
  }

  return increase;
})();

console.log(add(1)(10)(18).toString());
