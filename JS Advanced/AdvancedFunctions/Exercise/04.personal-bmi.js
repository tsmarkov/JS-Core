function generateBMI(name, age, weight, height) {
  let bmi = (function () {
    return Math.round(weight / (Math.pow(height, 2)) * 10000)
  })();

  let status = (function () {
    if (bmi < 18.5) {
      return 'underweight';
    } else if (bmi < 25) {
      return 'normal';
    } else if (bmi < 30) {
      return 'overweight';
    } else if (bmi >= 30) {
      return 'obese';
    }
  })();

  let resultObj = {
    name: name,
    personalInfo: {
      age: age,
      weight: weight,
      height: height
    },
    BMI: bmi,
    status: status
  }

  if (status == 'obese') {
    resultObj.recommendation = 'admission required';
  }

  return resultObj;
}

console.log(generateBMI("Honey Boo Boo", 9, 57, 137));
console.log('-------------------------------------------')
console.log(generateBMI("Peter", 29, 75, 182));
